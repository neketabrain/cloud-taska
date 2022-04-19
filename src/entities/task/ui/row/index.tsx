import clsx from 'clsx';

import { Task } from 'shared/api/task';
import { CalendarIcon, ClockIcon, FireIcon } from 'shared/assets/icons';
import { formatDate, formatTime } from 'shared/lib';
import { DropdownMenu } from 'shared/ui';

import styles from './styles.module.scss';

interface TaskRowProps {
  task: Task;
  toggle?: React.ReactNode;
  actions?: React.ReactNode[];
  className?: string;
  active?: boolean;
}

export const TaskRow: React.VFC<TaskRowProps> = (props) => {
  const { task, className, active, toggle, actions } = props;

  const startDate = new Date(task.start_date);
  const dueDate = new Date(task.due_date);

  return (
    <div className={clsx(styles.taskRow, task.completed && styles.taskRow_active, className)}>
      <div className={styles.left}>
        {toggle && <div className={styles.toggle}>{toggle}</div>}

        <div>
          <p className={styles.title}>{task.title}</p>
          <p className={styles.description}>{task.description}</p>
        </div>
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

        {actions?.length && <DropdownMenu className={styles.dropdownMenu} items={actions} />}
      </div>
    </div>
  );
};
