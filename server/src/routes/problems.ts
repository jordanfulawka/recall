import express from 'express';
import {
  createProblem,
  getProblemsByUserId,
  reviewProblem,
} from '../database/problems.ts';
import { httpAuth } from '../middlewares/httpAuth.ts';

const router = express.Router();

// creating a new problem for the first time
router.post('/', httpAuth, async (req, res) => {
  try {
    const { title, url, tags, notes, confidence } = req.body;
    const userId = (req as any).user.id;
    const newProblem = await createProblem(
      userId,
      title,
      url,
      tags,
      notes,
      confidence,
    );
    return res.status(200).json({ newProblem });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: 'there was an error uploading this problem' });
  }
});

router.patch('/:id/review', httpAuth, async (req, res) => {
  try {
    const problemId = String(req.params.id);
    const { confidence, notes } = req.body;
    const reviewedProblem = await reviewProblem(problemId, notes, confidence);
    return res.status(200).json({ reviewedProblem });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: 'could not complete your review for this problem' });
  }
});

router.get('/', httpAuth, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const problems = await getProblemsByUserId(userId);
    return res.status(200).json({ problems });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: 'there was an error fetching your problems' });
  }
});

export default router;
