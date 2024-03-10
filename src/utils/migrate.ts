import { Pool } from 'pg';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

export const pool = new Pool({
  connectionString: process.env.POSTGRES_DB_URL,
});

const db = drizzle(pool);

async function main() {
  console.log('Migration started....');
  await migrate(db, { migrationsFolder: 'src/migrations' });
  console.log('Migration ended....');
  await pool.end();
  process.exit(0);
}
main().catch((reason) => {
  console.log(reason);
  process.exit(0);
});
