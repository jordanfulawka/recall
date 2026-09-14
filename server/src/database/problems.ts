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
  notes: string,
  confidence: number,
) {
  const text =
    'INSERT INTO problems(user_id, title, url, notes, confidence) VALUES($1, $2, $3, $4, $5) RETURNING *';
  const values = [userId, title, url, notes, confidence];
  const result = await pool.query(text, values);
  return result.rows;
}

async function getProblemsByUserId(userId: string) {
  const text = 'SELECT * FROM problems WHERE user_id = $1';
  const values = [userId];

  const result = await pool.query(text, values);
  return result.rows;
}

export { getAllProblems, createProblem, getProblemsByUserId };
