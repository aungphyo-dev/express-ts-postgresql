import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  schema: './src/models/*',
  out: './src/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_DB_URL as string,
  },
  verbose: true,
  strict: true,
});
