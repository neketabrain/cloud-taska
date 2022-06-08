import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { viewerModel } from 'entities/viewer';
import { LogoutIcon } from 'shared/assets/icons';
import { Button } from 'shared/ui';

import styles from './styles.module.scss';

export const SignOut: React.FC = () => {
  const { t } = useTranslation('actions');
  const [isPending, setPending] = useState(false);

  async function signOut() {
    setPending(true);
    await viewerModel.effects.signOutFx();
    setPending(false);
  }

  return (
    <Button
      variant="transparent"
      onClick={signOut}
      aria-label={t('signOut')}
      className={styles.button}
      disabled={isPending}
    >
      <LogoutIcon />
    </Button>
  );
};
