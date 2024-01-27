import { z } from 'zod';
import { jwtPayload, userSchema } from './user.validation';

export type User = z.infer<typeof userSchema>;
export type TJwtPayload = z.infer<typeof jwtPayload>;
