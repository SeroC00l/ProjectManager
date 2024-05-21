import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
  name: z.string().optional(),
});

export const projectSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters"),
  description: z.string().min(10, "Project description must be at least 10 characters"),
  owner: z.string().optional(),
}); 