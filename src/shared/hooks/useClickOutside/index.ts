import { RefObject, useCallback, useEffect, useRef } from 'react';

export function useClickOutside<T extends HTMLElement>(close: VoidFunction): RefObject<T> {
  const ref = useRef<T>(null);

  const mouseListener = useCallback(
    (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        close();
      }
    },
    [close]
  );

  const keyboardListener = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    setTimeout(() => {
      document.addEventListener('click', mouseListener, false);
      document.addEventListener('keyup', keyboardListener, true);
    });

    return () => {
      document.removeEventListener('click', mouseListener, false);
      document.removeEventListener('keyup', keyboardListener, true);
    };
  }, [mouseListener, keyboardListener]);

  return ref;
}
