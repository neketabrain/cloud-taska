import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { CloseIcon } from 'shared/assets/icons';
import { Modal, Button } from 'shared/ui';

import styles from './styles.module.scss';

interface ConfirmModalProps {
  accept: VoidFunction;
  close: VoidFunction;
  acceptText?: string;
  closeText?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  className?: string;
}

export const ConfirmModal: React.VFC<ConfirmModalProps> = (props) => {
  const { title, description, accept, close, acceptText, closeText, className } = props;

  const { t } = useTranslation('actions');
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
            aria-label={t('close')}
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
          {closeText ?? t('close')}
        </Button>

        <Button onClick={accept}>{acceptText ?? t('accept')}</Button>
      </div>
    </Modal>
  );
};
