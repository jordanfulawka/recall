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
  tags: string[],
  notes: string,
  confidence: number,
) {
  const { review_interval_days, next_review } = computeSchedule(confidence, 1);
  const text =
    'INSERT INTO problems(user_id, title, url, tags, notes, confidence, next_review, review_interval_days) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
  const values = [
    userId,
    title,
    url,
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
      SET notes = $1, confidence = $2, review_interval_days = $3,
        next_review = $4, updated_at = NOW(), last_reviewed = NOW()
      WHERE id = $5
      RETURNING *`,
      [notes, confidence, review_interval_days, next_review, problemId],
    );

    await client.query(
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

async function getProblemsByUserId(userId: string) {
  const text = 'SELECT * FROM problems WHERE user_id = $1';
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

export {
  getAllProblems,
  createProblem,
  reviewProblem,
  getProblemsByUserId,
  getDueProblemsByUserId,
  getProblemById,
};
