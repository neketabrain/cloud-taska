import { useCallback, useEffect, useRef } from 'react';

type Debounce = <T extends Function>(callback: T, delay: number, immediately?: boolean) => void;

export function useDebounce(): Debounce {
  const timer = useRef<number>();

  useEffect(() => {
    return () => {
      window.clearTimeout(timer.current);
    };
  }, []);

  return useCallback((callback, delay, immediately) => {
    if (!timer.current && immediately) {
      timer.current = window.setTimeout(callback, 0);
    } else {
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(callback, delay);
    }
  }, []);
}
