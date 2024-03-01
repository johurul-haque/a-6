import crypto from 'crypto';

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY!;

export function encryptUrl(url: string) {
  const cipher = crypto.createCipher('aes-256-gcm', secretKey);

  let encryptedUrl = cipher.update(url, 'utf8', 'hex');
  encryptedUrl += cipher.final('hex');

  return encryptedUrl;
}

export function decryptUrl(url: string) {
  const decipher = crypto.createDecipher('aes-256-gcm', secretKey);

  let decryptedUrl = decipher.update(url, 'hex', 'utf8');
  decryptedUrl += decipher.final('utf8');

  return decryptedUrl;
}
