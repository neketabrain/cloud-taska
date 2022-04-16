import { RefObject, useCallback, useEffect, useRef } from 'react';

export function useClickOutside<T extends HTMLElement>(callback: VoidFunction): RefObject<T> {
  const ref = useRef<T>(null);

  const mouseListener = useCallback(
    (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    },
    [callback]
  );

  const keyboardListener = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        callback();
      }
    },
    [callback]
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
