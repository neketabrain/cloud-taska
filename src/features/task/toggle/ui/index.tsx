import clsx from 'clsx';
import { useCallback } from 'react';

import { taskModel } from 'entities/task';
import { Task } from 'shared/api/task';
import { CheckIcon, RenewIcon } from 'shared/assets/icons';

import styles from './styles.module.scss';

interface ToggleTaskProps {
  task: Task;
}

function useToggle() {
  const toggleTask = useCallback(
    (taskId: number) => () => {
      taskModel.events.toggleTask(taskId);
    },
    []
  );

  return toggleTask;
}

export const ToggleTask: React.VFC<ToggleTaskProps> = (props) => {
  const { task } = props;
  const toggleTask = useToggle();

  return (
    <label className={styles.toggleTask} aria-label="Переключить состояние задачи">
      <input type="checkbox" checked={task.completed} onChange={toggleTask(task.id)} className={styles.checkbox} />
      {task.completed ? (
        <>
          <RenewIcon /> <span>Возобновить</span>
        </>
      ) : (
        <>
          <CheckIcon /> <span>Завершить</span>
        </>
      )}
    </label>
  );
};

export const ToggleTaskMini: React.VFC<ToggleTaskProps> = (props) => {
  const { task } = props;
  const toggleTask = useToggle();

  return (
    <label
      className={clsx(styles.toggleTaskMini, task.completed && styles.toggleTaskMini_active)}
      aria-label="Переключить состояние задачи"
    >
      <input type="checkbox" checked={task.completed} onChange={toggleTask(task.id)} className={styles.checkbox} />
      {task.completed ? <RenewIcon /> : <CheckIcon />}
    </label>
  );
};
