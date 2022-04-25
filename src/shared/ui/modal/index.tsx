import clsx from 'clsx';
import { CSSProperties, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { CloseIcon } from 'shared/assets/icons';
import { useClickOutside } from 'shared/lib';

import { Button } from '../button';

import styles from './styles.module.scss';

export interface ModalProps {
  close: VoidFunction;
  title?: React.ReactNode;
  withCloseButton?: boolean;
  rootId?: string;
  className?: string;
  wrapperClassName?: string;
  style?: CSSProperties;
}

export const Modal: React.FC<ModalProps> = (props) => {
  const { title, children, close, withCloseButton, rootId = 'modal-root', className, style, wrapperClassName } = props;

  const { t } = useTranslation('actions');
  const root = document.getElementById(rootId);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, close);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!root) {
    return null;
  }

  return createPortal(
    <div className={clsx(styles.wrapper, wrapperClassName)}>
      <div className={clsx(styles.modal, className)} style={style} ref={modalRef} role="dialog">
        {(title || withCloseButton) && (
          <div className={styles.header}>
            {title && <h3 className={styles.title}>{title}</h3>}

            {withCloseButton && (
              <Button
                onClick={close}
                variant="transparent"
                aria-label={t('close')}
                className={styles.closeButton}
                ref={closeButtonRef}
              >
                <CloseIcon />
              </Button>
            )}
          </div>
        )}
        {children}
      </div>
    </div>,
    root
  );
};
