import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { Task } from 'shared/api/task';
import { ArrowIcon, CalendarIcon, ClockIcon, FireIcon } from 'shared/assets/icons';
import { formatDate, formatTime } from 'shared/lib';

import styles from './styles.module.scss';

interface TaskRowProps {
  task: Task;
  className?: string;
  isActive?: boolean;
  link?: string;
}

export const TaskRow: React.VFC<TaskRowProps> = (props) => {
  const { task, className, link, isActive } = props;

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
          <div className={clsx(styles.datetime, isActive && styles.datetime_active)}>
            {isActive ? <FireIcon /> : <ClockIcon />}
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
          <Link to={link} className={styles.link}>
            <ArrowIcon />
          </Link>
        )}
      </div>
    </div>
  );
};
