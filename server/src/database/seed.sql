CREATE TABLE users (
  id uuid UNIQUE DEFAULT gen_random_uuid(),
  name VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE problems (
  id uuid UNIQUE DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(500),
  status VARCHAR(20) NOT NULL DEFAULT 'attempted' CHECK (status IN ('attempted', 'solved', 'solved_with_help', 'stuck')),
  tags TEXT[],
  notes TEXT,
  date_added TIMESTAMP DEFAULT NOW(),
  confidence SMALLINT CHECK (confidence BETWEEN 1 and 5),
  last_reviewed TIMESTAMP,
  next_review TIMESTAMP DEFAULT NOW() + '7 days',
  review_interval_days INTEGER DEFAULT 7,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE reviews (
  id uuid DEFAULT gen_random_uuid(),
  problem_id uuid NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
  confidence SMALLINT NOT NULL CHECK(confidence BETWEEN 1 AND 5),
  notes TEXT,
  reviewed_at TIMESTAMP DEFAULT NOW()
);

