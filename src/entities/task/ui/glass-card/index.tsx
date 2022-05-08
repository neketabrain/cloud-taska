import clsx from 'clsx';

import { TaskNormalized } from 'shared/api';
import { FireIcon } from 'shared/assets/icons';
import { formatTime } from 'shared/lib';

import styles from './styles.module.scss';

interface TaskGlassCardProps {
  task: TaskNormalized;
  className?: string;
  active?: boolean;
}

export const TaskGlassCard: React.VFC<TaskGlassCardProps> = (props) => {
  const { task, className, active } = props;

  return (
    <article className={clsx(styles.card, active && styles.card_active, className)}>
      <div>
        <p className={styles.title}>{task.title}</p>
        <p className={styles.description}>{task.description}</p>
      </div>

      <div className={styles.time}>
        <FireIcon />
        <p>
          {formatTime(task.start_date)} - {formatTime(task.due_date)}
        </p>
      </div>
    </article>
  );
};
