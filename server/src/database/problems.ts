import { computeSchedule } from '../lib/utils.ts';
import pool from './pool.ts';

async function getAllProblems() {
  const text = 'SELECT * FROM problems';
  const result = await pool.query(text);
  return result.rows;
}

async function createProblem(
  userId: string,
  title: string,
  url: string,
  difficulty: string,
  tags: string[],
  notes: string,
  confidence: number,
) {
  const { review_interval_days, next_review } = computeSchedule(confidence, 1);
  const text =
    'INSERT INTO problems(user_id, title, url, difficulty, tags, notes, confidence, next_review, review_interval_days) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
  const values = [
    userId,
    title,
    url,
    difficulty,
    tags,
    notes,
    confidence,
    next_review,
    review_interval_days,
  ];
  const result = await pool.query(text, values);
  return result.rows[0];
}

async function reviewProblem(
  problemId: string,
  notes: string,
  confidence: number,
) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const result1 = await client.query(
      'SELECT review_interval_days FROM problems WHERE id = $1',
      [problemId],
    );

    if (result1.rows.length === 0)
      throw new Error('No problem found with this id');

    const currentInterval = result1.rows[0]?.review_interval_days;
    const { review_interval_days, next_review } = computeSchedule(
      confidence,
      currentInterval,
    );

    const result2 = await client.query(
      `UPDATE problems
      SET confidence = $1, review_interval_days = $2,
        next_review = $3, updated_at = NOW(), last_reviewed = NOW()
      WHERE id = $4
      RETURNING *`,
      [confidence, review_interval_days, next_review, problemId],
    );

    const result3 = await client.query(
      `INSERT into REVIEWS(problem_id, confidence, notes) VALUES($1, $2, $3) RETURNING *`,
      [problemId, confidence, notes],
    );

    await client.query('COMMIT');
    return result2.rows[0];
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

async function updateProblemNotes(problemId: string, notes: string) {
  const text =
    'UPDATE problems SET notes = $1, updated_at = NOW() WHERE id = $2 RETURNING *';
  const values = [notes, problemId];

  const result = await pool.query(text, values);
  return result.rows[0];
}

async function getProblemsByUserId(userId: string) {
  const text = 'SELECT * FROM problems WHERE user_id = $1 order by next_review';
  const values = [userId];

  const result = await pool.query(text, values);
  return result.rows;
}

async function getDueProblemsByUserId(userId: string) {
  const text =
    'SELECT * FROM problems WHERE user_id = $1 AND next_review::date <= current_date';
  const values = [userId];

  const result = await pool.query(text, values);
  return result.rows;
}

async function getProblemById(problemId: string) {
  const text = 'SELECT * FROM problems WHERE id = $1';
  const values = [problemId];

  const result = await pool.query(text, values);
  console.log(result);
  return result.rows[0];
}

async function getUserActivityDates(userId: string) {
  const text = `
    SELECT DISTINCT activity_date FROM (
      SELECT reviewed_at::date AS activity_date
      FROM reviews
      JOIN problems on problems.id = reviews.problem_id
      WHERE problems.user_id = $1
      UNION
      SELECT date_added::date as activity_date
      FROM problems
      WHERE user_id = $1
    ) AS activity
    ORDER BY activity_date DESC
  `;
  const values = [userId];

  const result = await pool.query(text, values);
  return result.rows.map((row) => row.activity_date);
}

function computeStreak(dates: Date[]) {
  if (dates.length === 0) return 0;

  const isSameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();
  const subtractDays = (d: Date, n: number) => {
    const copy = new Date(d);
    copy.setDate(copy.getDate() - n);
    return copy;
  };

  let expected = new Date();
  expected.setHours(0, 0, 0, 0);
  if (!isSameDay(dates[0], expected)) {
    expected = subtractDays(expected, 1);
  }

  let streak = 0;
  for (const date of dates) {
    if (isSameDay(date, expected)) {
      streak++;
      expected = subtractDays(expected, 1);
    } else if (date < expected) {
      break;
    }
  }
  return streak;
}

async function getUserStats(userId: string) {
  const text = `
  SELECT SUM(1) tracked_problems, SUM(CASE WHEN next_review::date <= current_date THEN 1 ELSE 0 END) due_problems FROM problems WHERE user_id = $1
  `;
  const values = [userId];

  const result = await pool.query(text, values);
  const activityDates = await getUserActivityDates(userId);
  const streak = computeStreak(activityDates);
  return { ...result.rows[0], streak };
}

export {
  getAllProblems,
  createProblem,
  reviewProblem,
  updateProblemNotes,
  getProblemsByUserId,
  getDueProblemsByUserId,
  getProblemById,
  getUserStats,
};
