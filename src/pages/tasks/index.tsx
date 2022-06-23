import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { taskLib, taskModel, TaskRow } from 'entities/task';
import { Task } from 'features/task';

import styles from './styles.module.scss';

export const TasksPage: React.FC = () => {
  const { t: tTask } = useTranslation('task');
  const { t: tActivity } = useTranslation('activity');

  const currentTaskId = taskModel.useCurrentTaskId();
  const tasks = taskModel.useTasks();
  const completedTasks = taskModel.useCompletedTasks();
  const activeTasks = taskModel.useActiveTasks();
  const filteredTasks = taskModel.useFilteredTasks();
  const sortedTasks = useMemo(() => taskLib.sortTasksByDate(filteredTasks), [filteredTasks]);

  return (
    <div className={styles.block}>
      <div className={styles.statisticsContainer}>
        <div className={styles.statistics}>
          <p>
            {tActivity('total')}: <span>{tasks.length}</span>
          </p>
          <p>
            {tActivity('completed')}: <span>{completedTasks.length}</span>
          </p>
          <p>
            {tActivity('left')}: <span>{activeTasks.length}</span>
          </p>
        </div>

        <Task.CreateTask className={styles.createTask} />
      </div>

      <div className={styles.tasksContainer}>
        <aside>
          <Task.FilterTasks className={styles.filters} />
        </aside>

        <section className={styles.tasks}>
          <ul className={styles.block}>
            {!sortedTasks.length && (
              <div className={styles.emptyContainer}>
                <p className={styles.emptyText}>{tTask('noTasks')}</p>
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
    </div>
  );
};
