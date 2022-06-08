import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { taskLib, taskModel, TaskRow } from 'entities/task';
import { Task } from 'features/task';

import styles from './styles.module.scss';

export const TasksPage: React.FC = () => {
  const { t } = useTranslation('task');

  const currentTaskId = taskModel.useCurrentTaskId();
  const tasks = taskModel.useFilteredTasks();
  const sortedTasks = useMemo(() => taskLib.sortTasksByDate(tasks), [tasks]);

  return (
    <div className={styles.container}>
      <aside>
        <Task.FilterTasks className={styles.filters} />
      </aside>

      <section className={styles.tasks}>
        <ul className={styles.block}>
          {!sortedTasks.length && (
            <div className={styles.emptyContainer}>
              <p className={styles.emptyText}>{t('noTasks')}</p>
            </div>
          )}

          {!!sortedTasks.length &&
            sortedTasks.map((task) => (
              <li key={task.id} className={styles.item}>
                <TaskRow
                  task={task}
                  active={task.id === currentTaskId}
                  toggle={<Task.ToggleTaskMini task={task} />}
                  actions={[<Task.EditTask task={task} />, <Task.DeleteTask taskId={task.id} />]}
                />
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
};
