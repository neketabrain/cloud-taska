import { Task } from 'shared/api/task';
import { CalendarIcon, FireIcon } from 'shared/assets/icons';
import { formatDate, formatTime } from 'shared/lib';
import { Tag } from 'shared/ui';

import styles from './styles.module.scss';

interface TaskCardProps {
  task: Task;
  label: string;
  action?: React.ReactNode;
}

export const TaskCard: React.VFC<TaskCardProps> = (props) => {
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
