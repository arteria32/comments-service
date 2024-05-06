import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();

const pool = new Pool();
export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  const res = await pool
    .query(text, params)
    .catch((error) => console.warn('error query', error));
  const duration = Date.now() - start;
  console.log('executed query', { text, duration, rows: res?.rowCount });
  return res;
};
