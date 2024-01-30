import { SERVER_DOMAIN } from '@/config';

export function fetchProfile(cookie: string) {
  return fetch(`${SERVER_DOMAIN}/profile`, {
    headers: {
      Authorization: cookie,
    },
  });
}
