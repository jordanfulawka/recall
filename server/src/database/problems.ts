import type { Problem } from '../lib/types.ts';
import pool from './pool.ts';

async function getAllProblems() {
  const text = 'SELECT * FROM problems';
  const result = await pool.query(text);
  return result.rows;
}

async function createProblem(title: string, url: string, notes: string) {
  const text =
    'INSERT INTO problems(title, url, notes) VALUES($1, $2, $3) RETURNING *';
  const values = [title, url, notes];
  const result = await pool.query(text, values);
  return result.rows;
}

export { getAllProblems, createProblem };
