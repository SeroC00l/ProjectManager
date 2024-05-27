import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().optional(),
});

export const projectSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters"),
  description: z
    .string()
    .min(10, "Project description must be at least 10 characters"),
  owner: z.string().optional(),
});

export const taskSchema = z.object({
  name: z.string().min(3, "Task name must be at least 3 characters"),
  description: z
    .string()
    .min(10, "Task description must be at least 10 characters"),
  status: z.string().min(3, "Task status must be at least 3 characters"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  projectId: z.string().min(3, "Project id must be at least 3 characters"),
});

export const statusSchema = z.object({
  name: z.string().min(3, "Status name must be at least 3 characters"),
  color: z.string().optional(),
  projectId: z.string().min(3, "Project id must be at least 3 characters"),
});

export const profileSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});
