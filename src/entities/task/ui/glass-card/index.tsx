import clsx from 'clsx';

import { Task } from 'shared/api/task';
import { FireIcon } from 'shared/assets/icons';
import { formatTime } from 'shared/lib';

import styles from './styles.module.scss';

interface TaskGlassCardProps {
  task: Task;
  className?: string;
  active?: boolean;
}

export const TaskGlassCard: React.VFC<TaskGlassCardProps> = (props) => {
  const { task, className, active } = props;

  const startDate = new Date(task.start_date);
  const dueDate = new Date(task.due_date);

  return (
    <article className={clsx(styles.card, active && styles.card_active, className)}>
      <div>
        <p className={styles.title}>{task.title}</p>
        <p className={styles.description}>{task.description}</p>
      </div>

      <div className={styles.time}>
        <FireIcon />
        <p>
          {formatTime(startDate)} - {formatTime(dueDate)}
        </p>
      </div>
    </article>
  );
};
