import clsx from 'clsx';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { taskModel } from 'entities/task';
import { Task } from 'shared/api';
import { CheckIcon, RenewIcon } from 'shared/assets/icons';

import styles from './styles.module.scss';

interface ToggleTaskProps {
  task: Task;
}

function useToggle() {
  const toggleTask = useCallback(
    (taskId: string) => () => {
      taskModel.events.toggleTask(taskId);
    },
    []
  );

  return toggleTask;
}

export const ToggleTask: React.VFC<ToggleTaskProps> = (props) => {
  const { task } = props;

  const { t: tActions } = useTranslation('actions');
  const { t: tTask } = useTranslation('task');
  const toggleTask = useToggle();

  return (
    <label className={styles.toggleTask} aria-label={tTask('toggleTask')}>
      <input type="checkbox" checked={!!task.completed} onChange={toggleTask(task.id)} className={styles.checkbox} />
      {task.completed ? (
        <>
          <RenewIcon /> <span>{tActions('renew')}</span>
        </>
      ) : (
        <>
          <CheckIcon /> <span>{tActions('complete')}</span>
        </>
      )}
    </label>
  );
};

export const ToggleTaskMini: React.VFC<ToggleTaskProps> = (props) => {
  const { task } = props;

  const { t } = useTranslation('task');
  const toggleTask = useToggle();

  return (
    <label
      className={clsx(styles.toggleTaskMini, task.completed && styles.toggleTaskMini_active)}
      aria-label={t('toggleTask')}
    >
      <input type="checkbox" checked={!!task.completed} onChange={toggleTask(task.id)} className={styles.checkbox} />
      {task.completed ? <RenewIcon /> : <CheckIcon />}
    </label>
  );
};
