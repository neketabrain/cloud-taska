import { useMemo } from 'react';
import SimpleBar from 'simplebar-react';

import { TaskGlassCard, taskModel, taskLib } from 'entities/task';

import styles from './styles.module.scss';

export const TaskList: React.VFC = () => {
  const tasks = taskModel.useTasks();
  const taskList = useMemo(
    () => taskLib.sortTasksByDate(taskLib.getTasksForToday(taskLib.getActiveTasks(tasks))),
    [tasks]
  );

  return (
    <section className={styles.container}>
      <div className={styles.circleSmall} />
      <div className={styles.circleMedium} />
      <div className={styles.circleLarge} />

      <h2 className={styles.title}>ЗАДАЧИ НА СЕГОДНЯ</h2>

      <ul className={styles.list}>
        <SimpleBar className={styles.scrollbar}>
          {taskList.map((task) => (
            <li key={task.id} className={styles.item}>
              <TaskGlassCard task={task} />
            </li>
          ))}
        </SimpleBar>
      </ul>
    </section>
  );
};
