import { TaskCard, taskModel } from 'entities/task';
import { ToggleTask } from 'features/toggle-task';

import { Activity } from './activity';
import { TaskList } from './list';
import styles from './styles.module.scss';
import { TaskTable } from './table';

export const HomePage: React.VFC = () => {
  const currentTask = taskModel.useCurrentTask();

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
            <TaskCard task={currentTask} label="текущая задача" action={<ToggleTask task={currentTask} />} />
          )}
        </div>

        <div className={styles.table}>
          <TaskTable />
        </div>
      </div>
    </div>
  );
};
