import { z } from 'zod';

export const registerFormSchema = z
  .object({
    name: z.string().trim(),
    email: z.string().email(),
    password: z.string().trim().min(4),
    confirm_password: z.string().trim().min(4),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password doesn't match",
    path: ['confirm_password'],
  });

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().trim().min(4),
});

export type registerFormSchema = z.infer<typeof registerFormSchema>;
export type LoginPayload = z.infer<typeof loginFormSchema>;
