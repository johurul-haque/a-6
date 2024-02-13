import { months } from './sales.constants';

export function getWeekOfYear(date: string) {
  const newDate = new Date(date);

  const year = newDate.getFullYear();
  const oneJan = new Date(year, 0, 1);

  const millisecondsInDay = 86400000;

  return Math.ceil(
    ((newDate.getTime() - oneJan.getTime()) / millisecondsInDay +
      oneJan.getDay() +
      1) /
      7
  );
}

export function getMonthName(date: string) {
  const month = Number(date.split('-')[1]);
  return months[month - 1];
}
