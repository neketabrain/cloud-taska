import { useTranslation } from 'react-i18next';

import { Button, Modal, ModalProps } from 'shared/ui';

import styles from './styles.module.scss';

interface ConfirmModalProps extends Omit<ModalProps, 'close'> {
  accept: VoidFunction;
  cancel: VoidFunction;
  description?: React.ReactNode;
  acceptText?: string;
  cancelText?: string;
}

export const ConfirmModal: React.VFC<ConfirmModalProps> = (props) => {
  const { description, accept, cancel, acceptText, cancelText, ...rest } = props;

  const { t } = useTranslation('actions');

  return (
    <Modal close={cancel} withCloseButton={true} {...rest}>
      {description && <p className={styles.description}>{description}</p>}

      <div className={styles.actions}>
        <Button variant="secondary" onClick={cancel}>
          {cancelText ?? t('cancel')}
        </Button>

        <Button onClick={accept}>{acceptText ?? t('accept')}</Button>
      </div>
    </Modal>
  );
};
