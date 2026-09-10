import pg, { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://recall:recall@localhost:5432/recall',
});

export default pool;
