import express from 'express';
import problemRouter from './routes/problems.ts';

const app = express();

app.use(express.json());

app.use('/problems', problemRouter);

app.get('/', (req, res) => {
  res.json({ message: 'hewllo world' });
});

export default app;
