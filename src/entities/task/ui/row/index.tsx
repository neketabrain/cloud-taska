import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { Task } from 'shared/api/task';
import { ArrowIcon, CalendarIcon, ClockIcon, FireIcon } from 'shared/assets/icons';
import { formatDate, formatTime } from 'shared/lib';

import styles from './styles.module.scss';

interface TaskRowProps {
  task: Task;
  className?: string;
  active?: boolean;
  link?: string;
}

export const TaskRow: React.VFC<TaskRowProps> = (props) => {
  const { task, className, link, active } = props;

  const startDate = new Date(task.start_date);
  const dueDate = new Date(task.due_date);

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.left}>
        <p className={styles.title}>{task.title}</p>
        <p className={styles.description}>{task.description}</p>
      </div>

      <div className={styles.right}>
        <div>
          <div className={clsx(styles.datetime, active && styles.datetime_active)}>
            {active ? <FireIcon /> : <ClockIcon />}
            <p>
              {formatTime(startDate)} - {formatTime(dueDate)}
            </p>
          </div>

          <div className={styles.datetime}>
            <CalendarIcon />
            <p>{formatDate(startDate)}</p>
          </div>
        </div>

        {link && (
          <Link to={link} className={styles.link} aria-label="Перейти к задаче">
            <ArrowIcon />
          </Link>
        )}
      </div>
    </div>
  );
};
