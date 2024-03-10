import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import 'dotenv/config';
export const createJwt = (payload: object) => {
  return jwt.sign(payload, process.env['TOKEN_SECRET'] as string, {
    expiresIn: '30 days',
  });
};
export const passwordHash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
export const apiVersion = (): string => `v${process.env['API_VERSION'] || 1}`;

export const client = new Client({
  connectionString: process.env.POSTGRES_DB_URL,
});
export const pgDatabase = drizzle(client);
