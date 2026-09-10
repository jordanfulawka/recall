import pool from './pool.ts';

async function register(username: string, hashedPassword: string) {
  const text =
    'INSERT INTO users(username, password_hash) VALUES($1, $2) RETURNING *';
  const values = [username, hashedPassword];

  const result = await pool.query(text, values);
  return result.rows[0];
}

export { register };
