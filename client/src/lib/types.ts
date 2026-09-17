interface User {
  id: string;
  username: string;
}

interface Problem {
  id: string;
  user_id: string;
  title: string;
  url: string;
  tags: string[];
  notes: string;
  date_added: string;
  confidence: number;
  last_reviewed?: string;
  next_review: string;
  review_interval_days: string;
  created_at: string;
  updated_at: string;
}

export type { User, Problem };
