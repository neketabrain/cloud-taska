import { useMemo } from 'react';

import { taskModel, taskLib } from 'entities/task';
import { Graph } from 'shared/ui';

import { getGraphColumns, getTaskStatistics } from './lib';
import styles from './styles.module.scss';

export const Activity: React.VFC = () => {
  const tasks = taskModel.useTasks();

  const taskList = useMemo(() => taskLib.getTasksForWeek(tasks), [tasks]);

  const { active, completed } = useMemo(() => getTaskStatistics(taskList), [taskList]);
  const graphColumns = useMemo(() => getGraphColumns(taskList), [taskList]);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>АКТИВНОСТЬ</h2>

      <div className={styles.content}>
        <div className={styles.graph}>
          <Graph columns={graphColumns} />
        </div>

        <div className={styles.separator} />

        <div className={styles.statistics}>
          <div className={styles.block}>
            <p className={styles.value}>{completed}</p>
            <p className={styles.label}>Завершено</p>
          </div>

          <div className={styles.block}>
            <p className={styles.value}>{active}</p>
            <p className={styles.label}>Осталось</p>
          </div>

          <div className={styles.block}>
            <p className={styles.value}>{taskList.length}</p>
            <p className={styles.label}>Всего</p>
          </div>
        </div>
      </div>
    </section>
  );
};
