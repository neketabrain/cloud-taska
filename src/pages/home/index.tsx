import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { TaskCard, taskModel } from 'entities/task';
import { Task } from 'features/task';

import { Activity } from './activity';
import { TaskList } from './list';
import styles from './styles.module.scss';
import { TaskTable } from './table';

export const HomePage: React.VFC = () => {
  const { t } = useTranslation('task');
  const currentTask = taskModel.useCurrentTask();

  useEffect(() => {
    taskModel.effects.getTasksFx();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.activity}>
          <Activity />
        </div>

        <div className={styles.list}>
          <TaskList />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.task}>
          {!!currentTask && (
            <TaskCard
              task={currentTask}
              label={t('currentTask').toLowerCase()}
              action={<Task.ToggleTask task={currentTask} />}
            />
          )}

          {!currentTask && <TaskCard.Empty label={t('currentTask').toLowerCase()} description={t('noActiveTask')} />}
        </div>

        <div className={styles.table}>
          <TaskTable />
        </div>
      </div>
    </div>
  );
};
