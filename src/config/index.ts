export const SERVER_DOMAIN =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/api'
    : 'https://api-a-5.vercel.app/api';
