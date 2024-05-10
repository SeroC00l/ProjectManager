import { z } from "zod";
export const authSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
  name: z.string().optional(), // Hacemos que el nombre sea opcional
});
