import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { Viewer } from 'shared/api';

import styles from './styles.module.scss';

interface ViewerAvatarProps {
  viewer: Viewer;
  size?: number;
  className?: string;
}

export const ViewerAvatar: React.FC<ViewerAvatarProps> = (props) => {
  const { viewer, className, size = 40 } = props;

  const { t } = useTranslation('viewer');

  const fontSize = size / 2.7;
  const [firstName, lastName] = viewer.displayName?.split(' ') || [];

  if (!viewer.photoURL) {
    return (
      <div className={clsx(styles.defaultAvatar, className)} style={{ width: size, height: size, fontSize }}>
        {firstName?.[0] || ''}
        {lastName?.[0] || ''}
      </div>
    );
  }

  return (
    <img
      src={viewer.photoURL}
      width={size}
      height={size}
      alt={t('userAvatar')}
      className={clsx(styles.avatar, className)}
    />
  );
};
