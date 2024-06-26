import {
  pgTable,
  uuid,
  text,
  timestamp,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { Member, Status, Subtask, metadata, Sender } from "@/type";

export const PrivacyLevel = pgEnum("privacy_level", [
  "owner_only",
  "members_only",
  "link_only",
  "public",
]);

export const projects = pgTable("projects", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  tags: jsonb("tags"),
  metadata: jsonb("metadata").$type<metadata>(),
  statuses: jsonb("statuses").$type<Status[]>(),
  privacy: PrivacyLevel("privacy").notNull().default("owner_only"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  owner: uuid("owner").notNull(),
  members: jsonb("members").$type<Member[]>().default([]),
});

export const tasks = pgTable("tasks", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  body: text("body"),
  status: jsonb("status").$type<Status>().notNull(),
  labels: jsonb("labels"),
  subtasks: jsonb("subtasks").$type<Subtask[]>(),
  metadata: jsonb("metadata"),
  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id),
  assignedTo: jsonb("assigned_to").$type<Member[]>().default([]),
});

export const messages = pgTable("messages", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  text: text("text").notNull(),
  sender: jsonb("sender").$type<Sender>().notNull(),
});
