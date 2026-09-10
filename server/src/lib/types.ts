interface Problem {
  id?: string;
  user_id?: string;
  title: string;
  url: string;
  status: string;
  text: string[];
  date_added: string;
  confidence: number;
  last_reviewed: string;
  next_review: string;
  review_interval_days: string;
  created_at: string;
  updated_at: string;
}

interface User {
  id: string;
  username: string;
  created_at: string;
}

export type { Problem, User };
