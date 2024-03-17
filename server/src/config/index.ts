import dotenv from 'dotenv';
import * as path from 'path';
import { z } from 'zod';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const env = z
  .object({
    PORT: z.number().default(8080),
    MONGODB_URI: z.string().url(),
    saltRounds: z.number().default(10),
    JWT_SECRET: z.string(),
    CLIENT_DOMAIN: z.string().url(),
    isDevelopment: z.boolean().default(process.env.NODE_ENV !== 'production'),
  })
  .parse(process.env);
