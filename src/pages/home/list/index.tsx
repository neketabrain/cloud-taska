import { useMemo } from 'react';
import SimpleBar from 'simplebar-react';

import { TaskGlassCard, taskModel, taskLib } from 'entities/task';

import styles from './styles.module.scss';

export const TaskList: React.VFC = () => {
  const currentTask = taskModel.useCurrentTask();
  const tasks = taskModel.useTasks();
  const tasksForToday = useMemo(() => taskLib.getTasksForToday(tasks), [tasks]);
  const taskList = useMemo(() => taskLib.sortTasksByDate(taskLib.getActiveTasks(tasksForToday)), [tasksForToday]);

  return (
    <section className={styles.container}>
      <div className={styles.circleSmall} />
      <div className={styles.circleMedium} />
      <div className={styles.circleLarge} />

      <h2 className={styles.title}>ЗАДАЧИ НА СЕГОДНЯ</h2>

      {!taskList.length && (
        <p className={styles.text}>{tasksForToday.length ? 'Все задачи выполнены' : 'Задачи на сегодня отсутствуют'}</p>
      )}

      {taskList.length && (
        <SimpleBar className={styles.scrollbar}>
          <ul className={styles.list}>
            {taskList.map((task) => (
              <li key={task.id} className={styles.item}>
                <TaskGlassCard task={task} active={task.id === currentTask?.id} />
              </li>
            ))}
          </ul>
        </SimpleBar>
      )}
    </section>
  );
};
