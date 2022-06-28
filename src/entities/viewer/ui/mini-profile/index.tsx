import { Viewer } from 'shared/api';
import { DropdownMenu } from 'shared/ui';

import { ViewerAvatar } from '../avatar';

import styles from './styles.module.scss';

interface ViewerMiniProfileProps {
  viewer: Viewer;
  actions?: React.ReactNode[];
  placement?: 'left' | 'right';
}

export const ViewerMiniProfile: React.FC<ViewerMiniProfileProps> = (props) => {
  const { viewer, actions, placement } = props;

  return (
    <DropdownMenu
      items={actions || []}
      contentClassName={styles.container}
      toggleElement={<ViewerAvatar viewer={viewer} size={32} />}
      placement={placement}
    >
      <div className={styles.user}>
        <ViewerAvatar viewer={viewer} />
        <p className={styles.name}>{viewer.displayName}</p>
      </div>

      {!!actions?.length && <div className={styles.separator} />}
    </DropdownMenu>
  );
};
