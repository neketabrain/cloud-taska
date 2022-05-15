import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { TaskGlassCard, taskModel, taskLib } from 'entities/task';
import { Scrollbar } from 'shared/ui';

import styles from './styles.module.scss';

export const TaskList: React.VFC = () => {
  const { t } = useTranslation('task');

  const currentTaskId = taskModel.useCurrentTaskId();
  const tasks = taskModel.useTasks();
  const tasksForToday = useMemo(() => taskLib.getTasksForToday(tasks), [tasks]);
  const taskList = useMemo(() => taskLib.sortTasksByDate(taskLib.getActiveTasks(tasksForToday)), [tasksForToday]);

  return (
    <section className={styles.container}>
      <div className={styles.circleSmall} />
      <div className={styles.circleMedium} />
      <div className={styles.circleLarge} />

      <h2 className={styles.title}>{t('tasksForToday').toUpperCase()}</h2>

      {!taskList.length && (
        <p className={styles.text}>{tasksForToday.length ? t('allTasksCompleted') : t('noTasksForToday')}</p>
      )}

      {!!taskList.length && (
        <Scrollbar className={styles.scrollbar} variant="light">
          <ul className={styles.list}>
            {taskList.map((task) => (
              <li key={task.id} className={styles.item}>
                <TaskGlassCard task={task} active={task.id === currentTaskId} />
              </li>
            ))}
          </ul>
        </Scrollbar>
      )}
    </section>
  );
};
