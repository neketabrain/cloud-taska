import { useTranslation } from 'react-i18next';

import { viewerModel } from 'entities/viewer';
import { LogoutIcon } from 'shared/assets/icons';
import { Button } from 'shared/ui';

import styles from './styles.module.scss';

export const SignOut: React.VFC = () => {
  const { t } = useTranslation('actions');

  function signOut() {
    viewerModel.effects.signOutFx();
  }

  return (
    <Button variant="transparent" onClick={signOut} aria-label={t('signOut')} className={styles.button}>
      <LogoutIcon />
    </Button>
  );
};
