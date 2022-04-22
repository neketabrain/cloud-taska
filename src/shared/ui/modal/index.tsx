import clsx from 'clsx';
import { CSSProperties } from 'react';
import { createPortal } from 'react-dom';

import { useClickOutside } from 'shared/lib';

import styles from './styles.module.scss';

interface ModalProps {
  close: VoidFunction;
  rootId?: string;
  className?: string;
  wrapperClassName?: string;
  style?: CSSProperties;
}

export const Modal: React.FC<ModalProps> = (props) => {
  const { children, close, rootId = 'modal-root', className, style, wrapperClassName } = props;

  const root = document.getElementById(rootId);
  const ref = useClickOutside<HTMLDivElement>(close);

  if (!root) {
    return null;
  }

  return createPortal(
    <div className={clsx(styles.wrapper, wrapperClassName)}>
      <div className={clsx(styles.modal, className)} style={style} ref={ref} role="dialog">
        {children}
      </div>
    </div>,
    root
  );
};
