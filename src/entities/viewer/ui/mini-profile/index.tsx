import { Viewer } from 'shared/api';
import { DropdownMenu } from 'shared/ui';

import { ViewerAvatar } from '../avatar';

import styles from './styles.module.scss';

interface ViewerMiniProfileProps {
  viewer: Viewer;
  actions?: React.ReactNode[];
}

export const ViewerMiniProfile: React.FC<ViewerMiniProfileProps> = (props) => {
  const { viewer, actions } = props;

  return (
    <DropdownMenu
      items={actions || []}
      contentClassName={styles.container}
      toggleElement={<ViewerAvatar viewer={viewer} size={32} />}
    >
      <div className={styles.user}>
        <ViewerAvatar viewer={viewer} />
        <p className={styles.name}>{viewer.displayName}</p>
      </div>

      {!!actions?.length && <div className={styles.separator} />}
    </DropdownMenu>
  );
};
