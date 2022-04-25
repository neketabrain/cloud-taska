import { RefObject, useCallback, useEffect } from 'react';

export function useClickOutside<T extends HTMLElement>(ref: RefObject<T>, callback: VoidFunction) {
  const mouseListener = useCallback(
    (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    },
    [callback, ref]
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
      document.addEventListener('mousedown', mouseListener, false);
      document.addEventListener('touchstart', mouseListener, false);
      document.addEventListener('keyup', keyboardListener, true);
    });

    return () => {
      document.removeEventListener('mousedown', mouseListener, false);
      document.removeEventListener('touchstart', mouseListener, false);
      document.removeEventListener('keyup', keyboardListener, true);
    };
  }, [mouseListener, keyboardListener]);
}
