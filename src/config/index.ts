import dotenv from 'dotenv';
import { cleanEnv, num, str } from 'envalid';
import * as path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const env = cleanEnv(process.env, {
  PORT: num({ default: 8080 }),
  MONGODB_URI: str(),
  saltRounds: num({ default: 10 }),
  JWT_SECRET: str({ default: 'secret' }),
});
