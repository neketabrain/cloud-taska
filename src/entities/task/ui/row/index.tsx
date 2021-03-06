import clsx from 'clsx';

import { TaskNormalized } from 'shared/api';
import { CalendarIcon, ClockIcon, FireIcon } from 'shared/assets/icons';
import { formatDate, formatTime } from 'shared/lib';
import { DropdownMenu, Tooltip } from 'shared/ui';

import styles from './styles.module.scss';

interface TaskRowProps {
  task: TaskNormalized;
  toggle?: React.ReactNode;
  actions?: React.ReactNode[];
  className?: string;
  active?: boolean;
}

export const TaskRow: React.FC<TaskRowProps> = (props) => {
  const { task, className, active, toggle, actions } = props;

  return (
    <div className={clsx(styles.taskRow, task.completed && styles.taskRow_active, className)}>
      <div className={clsx(styles.left, !!toggle && styles.left_withToggle)}>
        {toggle && <div className={styles.toggle}>{toggle}</div>}

        <Tooltip
          overlay={
            <>
              <b>{task.title}</b>
              <p>{task.description}</p>
            </>
          }
          placement="topLeft"
        >
          <div className={styles.info}>
            <p className={styles.title}>{task.title}</p>

            <p className={styles.description}>{task.description}</p>
          </div>
        </Tooltip>
      </div>

      <div className={styles.right}>
        <div>
          <div className={clsx(styles.datetime, active && styles.datetime_active)}>
            {active ? <FireIcon /> : <ClockIcon />}
            <p>
              {formatTime(task.start_date)} - {formatTime(task.due_date)}
            </p>
          </div>

          <div className={styles.datetime}>
            <CalendarIcon />
            <p>{formatDate(task.start_date)}</p>
          </div>
        </div>

        {actions?.length && (
          <DropdownMenu className={styles.dropdownMenu} buttonClassName={styles.dropdownButton} items={actions} />
        )}
      </div>
    </div>
  );
};
