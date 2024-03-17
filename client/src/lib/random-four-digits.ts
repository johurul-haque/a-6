export function randomFourDigits() {
  const MIN = 1000;
  const MAX = 9999;

  return Math.floor(Math.random() * (MAX - MIN) + MIN);
}
