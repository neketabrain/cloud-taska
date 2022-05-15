import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { taskModel } from 'entities/task';
import { TaskNormalized } from 'shared/api';
import { CheckIcon, RenewIcon } from 'shared/assets/icons';

import styles from './styles.module.scss';

interface ToggleTaskProps {
  task: TaskNormalized;
}

function useToggle() {
  const [isPending, setPending] = useState(false);

  const toggleTask = useCallback(
    (task: TaskNormalized) => async () => {
      setPending(true);
      await taskModel.effects.toggleTaskFx(task);
      setPending(false);
    },
    []
  );

  return { toggleTask, isPending };
}

export const ToggleTask: React.VFC<ToggleTaskProps> = (props) => {
  const { task } = props;

  const { t: tActions } = useTranslation('actions');
  const { t: tTask } = useTranslation('task');
  const { toggleTask, isPending } = useToggle();

  return (
    <label
      className={clsx(styles.toggleTask, { [styles.toggleTask_disabled]: isPending })}
      aria-label={tTask('toggleTask')}
    >
      <input
        type="checkbox"
        checked={!!task.completed}
        onChange={toggleTask(task)}
        className={styles.checkbox}
        disabled={isPending}
      />
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
  const { toggleTask, isPending } = useToggle();

  return (
    <label
      className={clsx(styles.toggleTaskMini, {
        [styles.toggleTaskMini_active]: task.completed,
        [styles.toggleTaskMini_disabled]: isPending,
      })}
      aria-label={t('toggleTask')}
    >
      <input
        type="checkbox"
        checked={!!task.completed}
        onChange={toggleTask(task)}
        className={styles.checkbox}
        disabled={isPending}
      />
      {task.completed ? <RenewIcon /> : <CheckIcon />}
    </label>
  );
};
