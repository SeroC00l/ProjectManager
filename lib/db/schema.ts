import { pgTable, uuid, text, varchar, timestamp, primaryKey, foreignKey } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const projects = pgTable('projects', {
  id: uuid('id').default(sql`gen_random_uuid()`).primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  owner: varchar('owner', { length: 256 }).notNull(),
});

export const tasks = pgTable('tasks', {
  id: uuid('id').default(sql`gen_random_uuid()`).primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  status: text('status').default('To Do'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  projectId: uuid('project_id').notNull().references(() => projects.id),
});
