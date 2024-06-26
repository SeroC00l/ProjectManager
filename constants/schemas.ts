import { messages, projects, tasks } from "@/lib/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().optional(),
});
export const statusSchema = z.object({
  name: z
    .string()
    .min(3, "Status name must be at least 3 characters")
    .max(20, "Status name must be less than 20 characters"),
  color: z.string(),
});
export const profileSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});
export const folderSchema = z.object({
  folderName: z.string().min(3, "Folder name must be at least 3 characters"),
});
export const fileSchema = z.object({
  name: z.string().min(3, "File name must be at least 3 characters"),
  publicUrl: z.string().optional(),
});
export const projectSchema = createInsertSchema(projects);
export const taskSchema = createInsertSchema(tasks, {
  status: statusSchema,
});
export const subtaskSchema = taskSchema.omit({
  projectId: true,
  subtasks: true,
});
export const messageSchema = createInsertSchema(messages, {
  text: z.string().max(1000, "Message must be less than 1000 characters"),
});
export const bodySchema = z.object({ body: taskSchema.shape.body });
export const iconSchema = z.object({ name: z.string(), background: z.string()});