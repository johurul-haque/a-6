import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY!;

export function encryptUrl(url: string) {
  const cipher = crypto.createCipher(algorithm, secretKey);

  let encryptedUrl = cipher.update(url, 'utf8', 'hex');
  encryptedUrl += cipher.final('hex');

  return encryptedUrl;
}

export function decryptUrl(url: string) {
  const decipher = crypto.createDecipher(algorithm, secretKey);

  let decryptedUrl = decipher.update(url, 'hex', 'utf8');
  decryptedUrl += decipher.final('utf8');

  return decryptedUrl;
}
