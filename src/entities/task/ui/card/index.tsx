import { TaskNormalized } from 'shared/api';
import { CalendarIcon, FireIcon } from 'shared/assets/icons';
import { formatDate, formatTime } from 'shared/lib';
import { Tag } from 'shared/ui';

import styles from './styles.module.scss';

interface EmptyTaskCardProps {
  label: string;
  description: string;
}

const EmptyTaskCard: React.FC<EmptyTaskCardProps> = (props) => {
  const { label, description } = props;

  return (
    <article className={styles.container}>
      <div className={styles.content}>
        <Tag as="h2">{label}</Tag>
        <p className={styles.empty}>{description}</p>
      </div>
    </article>
  );
};

interface TaskCardProps {
  task: TaskNormalized;
  label: string;
  action?: React.ReactNode;
}

export const TaskCard: React.FC<TaskCardProps> & { Empty: typeof EmptyTaskCard } = (props) => {
  const { label, task, action } = props;

  return (
    <article className={styles.container}>
      <div className={styles.content}>
        <Tag as="h2">{label}</Tag>

        <h3 className={styles.title}>{task.title}</h3>
        <p className={styles.description}>{task.description}</p>

        <div className={styles.time}>
          <FireIcon />
          <p>
            {formatTime(task.start_date)} - {formatTime(task.due_date)}
          </p>
        </div>

        <div className={styles.date}>
          <CalendarIcon />
          <p>{formatDate(task.start_date)}</p>
        </div>
      </div>

      {action && <div className={styles.action}>{action}</div>}
    </article>
  );
};

TaskCard.Empty = EmptyTaskCard;
