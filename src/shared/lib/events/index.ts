import { RefObject, useCallback, useEffect } from 'react';

export function useClickOutside<T extends HTMLElement>(ref: RefObject<T>, callback: VoidFunction): void {
  const mouseListener = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    },
    [callback, ref]
  );

  const keyboardListener = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    document.addEventListener('mousedown', mouseListener, false);
    document.addEventListener('touchstart', mouseListener, false);
    document.addEventListener('keyup', keyboardListener, true);

    return () => {
      document.removeEventListener('mousedown', mouseListener, false);
      document.removeEventListener('touchstart', mouseListener, false);
      document.removeEventListener('keyup', keyboardListener, true);
    };
  }, [mouseListener, keyboardListener]);
}
