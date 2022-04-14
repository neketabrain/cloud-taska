import clsx from 'clsx';

import { taskModel } from 'entities/task';
import { Task } from 'shared/api/task';
import { CheckIcon, RenewIcon } from 'shared/assets/icons';
import { Button } from 'shared/ui';

import styles from './styles.module.scss';

interface ToggleTaskProps {
  task: Task;
}

export const ToggleTask: React.VFC<ToggleTaskProps> = (props) => {
  const { task } = props;

  function toggleTask() {
    taskModel.events.toggleTask(task.id);
  }

  return (
    <Button
      onClick={toggleTask}
      className={styles.toggleTask}
      aria-label={task.completed ? 'Возобновить задачу' : 'Завершить задачу'}
    >
      {task.completed ? (
        <>
          <RenewIcon /> <span>Возобновить</span>
        </>
      ) : (
        <>
          <CheckIcon /> <span>Завершить</span>
        </>
      )}
    </Button>
  );
};

export const ToggleTaskMini: React.VFC<ToggleTaskProps> = (props) => {
  const { task } = props;

  function toggleTask() {
    taskModel.events.toggleTask(task.id);
  }

  return (
    <Button
      onClick={toggleTask}
      className={clsx(styles.toggleTaskMini, task.completed && styles.toggleTaskMini_active)}
      aria-label={task.completed ? 'Возобновить задачу' : 'Завершить задачу'}
    >
      {task.completed ? <RenewIcon /> : <CheckIcon />}
    </Button>
  );
};
