import { getLocale } from '../i18n';

export function getToday(): Date {
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  return today;
}

export function formatDate(date: Date, locale = getLocale()): string {
  return date.toLocaleDateString([locale, 'ru-RU'], { day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatTime(date: Date, locale = getLocale()): string {
  return date.toLocaleTimeString([locale, 'ru-RU'], { hour: '2-digit', minute: '2-digit', hour12: false });
}
