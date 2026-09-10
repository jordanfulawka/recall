import express from 'express';
import { createProblem } from '../database/problems.ts';

const router = express.Router();

router.post('/', async (req, res) => {
  const { title, url, notes } = req.body;
  console.log(req.body);
  const newProblem = await createProblem(title, url, notes);
  console.log(newProblem);
  res.json({ newProblem });
});

export default router;
