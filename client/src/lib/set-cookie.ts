import Cookies from 'js-cookie';

export function setTokenCookie(token: string) {
  return Cookies.set('token', `Bearer ${token}`, {
    expires: 15,
  });
}
