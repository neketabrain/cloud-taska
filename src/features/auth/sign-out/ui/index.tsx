import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { viewerModel } from 'entities/viewer';
import { LogoutIcon } from 'shared/assets/icons';
import { DropdownMenu } from 'shared/ui';

export const SignOut: React.FC = () => {
  const { t } = useTranslation('actions');
  const [isPending, setPending] = useState(false);

  async function signOut() {
    setPending(true);
    await viewerModel.effects.signOutFx();
    setPending(false);
  }

  return (
    <DropdownMenu.Item onClick={signOut} danger={true} disabled={isPending}>
      <LogoutIcon />
      {t('signOut')}
    </DropdownMenu.Item>
  );
};
