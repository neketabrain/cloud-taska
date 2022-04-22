import { getLocale } from './index';

describe('i18n', () => {
  test('Should return string', () => {
    expect(typeof getLocale()).toBe('string');
  });
});
