import 'dotenv/config';
import express from 'express';
import problemsRouter from './routes/problems.ts';
import authRouter from './routes/auth.ts';

const app = express();

app.use(express.json());

app.use('/api/v1/problems', problemsRouter);
app.use('/api/v1/auth', authRouter);

app.get('/', (req, res) => {
  res.json({ message: 'hewllo world' });
});

export default app;
