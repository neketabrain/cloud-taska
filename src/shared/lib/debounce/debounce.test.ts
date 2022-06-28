import { renderHook } from '@testing-library/react-hooks';

import { useDebounce } from './index';

describe('useDebounce', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should be defined', () => {
    expect(useDebounce).toBeDefined();
  });

  test('should return function', () => {
    const { result } = renderHook(useDebounce);

    expect(result.current).toBeInstanceOf(Function);
  });

  test('should call passed function immediately if argument passed', () => {
    const { result } = renderHook(useDebounce);
    const debounce = result.current;
    const callback = jest.fn();

    debounce(callback, 1000, true);
    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(5000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call passed function after delay once', () => {
    const { result } = renderHook(useDebounce);
    const debounce = result.current;
    const callback = jest.fn();

    debounce(callback, 1000);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(5000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should reset timeout after calling function again', () => {
    const { result } = renderHook(useDebounce);
    const debounce = result.current;
    const callback = jest.fn();

    debounce(callback, 1000);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();

    debounce(callback, 1000);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
