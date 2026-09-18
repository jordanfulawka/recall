import pool from './pool.ts';

async function getProblemReviews(problemId: string) {
  const text =
    'SELECT * FROM reviews where problem_id = $1 ORDER BY reviewed_at';
  const values = [problemId];

  const result = await pool.query(text, values);
  return result.rows;
}

export { getProblemReviews };
