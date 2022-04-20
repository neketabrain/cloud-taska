import { useEffect, useRef } from 'react';

import { CloseIcon } from 'shared/assets/icons';
import { Modal, Button } from 'shared/ui';

import styles from './styles.module.scss';

interface ConfirmModalProps {
  accept: VoidFunction;
  close: VoidFunction;
  title: React.ReactNode;
  description: React.ReactNode;
  className?: string;
}

export const ConfirmModal: React.VFC<ConfirmModalProps> = (props) => {
  const { title, description, accept, close, className } = props;

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, []);

  return (
    <Modal close={close} className={className}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>

          <Button
            onClick={close}
            variant="transparent"
            aria-label="Закрыть"
            className={styles.closeButton}
            ref={closeButtonRef}
          >
            <CloseIcon />
          </Button>
        </div>

        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.actions}>
        <Button variant="secondary" onClick={close}>
          Отменить
        </Button>

        <Button onClick={accept}>Удалить</Button>
      </div>
    </Modal>
  );
};
