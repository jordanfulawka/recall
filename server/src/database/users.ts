import pool from './pool.ts';

async function getUserByUsername(username: string) {
  const text = 'SELECT * FROM users WHERE username = $1';
  const values = [username];

  const result = await pool.query(text, values);
  return result.rows[0];
}

export { getUserByUsername };
