import { z } from 'zod';
import { jwtPayload, loginPayload, userSchema } from './user.validation';

export type User = z.infer<typeof userSchema>;
export type LoginPayload = z.infer<typeof loginPayload>;
export type TJwtPayload = z.infer<typeof jwtPayload>;
