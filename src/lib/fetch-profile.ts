import { env } from '@/config';

export function fetchProfile(cookie: string) {
  return fetch(`${env.SERVER_DOMAIN}/profile`, {
    headers: {
      Authorization: cookie,
    },
  });
}
