import { cleanEnv, str } from 'envalid';

export const env = cleanEnv(process.env, {
    SERVER_DOMAIN: str()
})
