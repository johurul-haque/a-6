import { months } from './sales.constants';

export function getWeeksNumberInMonth(date: string) {
  const newDate = new Date(date);

  const day = newDate.getDate();
  const dayOfWeek = newDate.getDay();

  return Math.ceil((day + dayOfWeek) / 7);
}

export function getMonthName(date: string) {
  return months[new Date(date).getMonth()];
}
