import { formatDate, formatTime, getToday } from './index';

describe('getToday', () => {
  test('Should return date', () => {
    expect(getToday()).toBeInstanceOf(Date);
  });

  test('Should return today date', () => {
    const today = getToday();
    const date = new Date();

    expect(today.getFullYear()).toBe(date.getFullYear());
    expect(today.getMonth()).toBe(date.getMonth());
    expect(today.getDate()).toBe(date.getDate());
  });

  test('Should return date with zero hours and minutes', () => {
    const today = getToday();

    expect(today.getHours()).toBe(0);
    expect(today.getMinutes()).toBe(0);
    expect(today.getSeconds()).toBe(0);
    expect(today.getMilliseconds()).toBe(0);
  });
});

describe('formatDate', () => {
  test('Should return string', () => {
    expect(typeof formatDate(new Date())).toBe('string');
  });
});

describe('formatTime', () => {
  test('Should return string', () => {
    expect(typeof formatTime(new Date())).toBe('string');
  });
});
