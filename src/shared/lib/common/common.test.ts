import { hasValue } from './index';

describe('hasValue', () => {
  test('Should return true if value not undefined or not null', () => {
    expect(hasValue('')).toBeTruthy();
    expect(hasValue(0)).toBeTruthy();
    expect(hasValue({})).toBeTruthy();
    expect(hasValue([])).toBeTruthy();
    expect(hasValue(NaN)).toBeTruthy();
  });

  test('Should return false if value is undefined or null', () => {
    expect(hasValue(undefined)).toBeFalsy();
    expect(hasValue(null)).toBeFalsy();
  });
});
