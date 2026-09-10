import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { register } from '../database/auth.ts';
import { getUserByUsername } from '../database/users.ts';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await register(username, hashedPassword);

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'no secret tokren!' });
    }

    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      process.env.JWT_SECRET,
    );
    res.status(201).json({ token });
  } catch (err) {
    return res.status(409).json({ error: 'an erorr has occued' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);

    if (!user) {
      return res.status(401).json({ error: 'username not found' });
    }

    const passwordsMatch = await bcrypt.compare(password, user.password_hash);

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'missing jwt secret' });
    }

    if (passwordsMatch) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        process.env.JWT_SECRET,
      );
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'incorrect password' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'error' });
  }
});

export default router;
