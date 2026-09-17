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

async function getProblemsByUserId(userId: string) {
  const text = 'SELECT * FROM problems WHERE user_id = $1';
  const values = [userId];

  const result = await pool.query(text, values);
  return result.rows;
}

export { getAllProblems, createProblem, getProblemsByUserId };
