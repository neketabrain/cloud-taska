import { useMemo } from 'react';

import { taskLib, taskModel, TaskRow } from 'entities/task';
import { Task } from 'features/task';
import { ROUTES } from 'shared/config';

import styles from './styles.module.scss';

export const TaskTable: React.VFC = () => {
  const currentTaskId = taskModel.useCurrentTaskId();
  const tasks = taskModel.useFilteredTasks();
  const sortedTasks = useMemo(() => taskLib.sortTasksByDate(tasks), [tasks]);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <Task.FilterTasksByPeriod allTasksLink={ROUTES.tasks} />
        <Task.CreateTask />
      </div>

      <ul className={styles.list}>
        {sortedTasks.map((task) => (
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
  );
};
