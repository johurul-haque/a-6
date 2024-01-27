import { Types } from 'mongoose';
import { z } from 'zod';

export const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const loginPayload = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const jwtPayload = z.object({
  _id: z.custom<Types.ObjectId>(),
});
