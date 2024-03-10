import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 35 }).notNull(),
  email: text('email').notNull().unique(),
  username: varchar('username', { length: 55 }).notNull().unique(),
  password: text('password').notNull(),
  created_at: timestamp('created_at', { mode: 'string' })
    .defaultNow()
    .notNull(),
  updated_at: timestamp('updated_at', { mode: 'string' }).default(sql`NULL`),
});
