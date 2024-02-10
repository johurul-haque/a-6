import { z } from 'zod';
import {
  deleteAccountPayload,
  jwtPayload,
  loginPayload,
  logoutPayload,
  userSchema,
} from './user.validation';

export type User = z.infer<typeof userSchema>;
export type LoginPayload = z.infer<typeof loginPayload>;
export type TJwtPayload = z.infer<typeof jwtPayload>;
export type LogoutPayload = z.infer<typeof logoutPayload>;
export type DeleteAccountPayload = z.infer<typeof deleteAccountPayload>;