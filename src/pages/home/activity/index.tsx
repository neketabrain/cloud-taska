import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { taskModel, taskLib } from 'entities/task';
import { BarChart } from 'shared/ui';

import { getChartData, getTaskStatistics } from './lib';
import styles from './styles.module.scss';

export const Activity: React.VFC = () => {
  const { t: tActivity } = useTranslation('activity');
  const { t: tDatetime } = useTranslation('datetime');

  const tasks = taskModel.useTasks();
  const taskList = useMemo(() => taskLib.getTasksForWeek(tasks), [tasks]);
  const { active, completed } = useMemo(() => getTaskStatistics(taskList), [taskList]);
  const chartData = useMemo(() => getChartData(taskList, tDatetime, tActivity), [taskList, tDatetime, tActivity]);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{tActivity('activity').toUpperCase()}</h2>

      <div className={styles.content}>
        <div className={styles.graph}>
          <BarChart data={chartData} className={styles.chart} />
        </div>

        <div className={styles.separator} />

        <div className={styles.statistics}>
          <div className={styles.block}>
            <p className={styles.value}>{completed}</p>
            <p className={styles.label}>{tActivity('completed')}</p>
          </div>

          <div className={styles.block}>
            <p className={styles.value}>{active}</p>
            <p className={styles.label}>{tActivity('left')}</p>
          </div>

          <div className={styles.block}>
            <p className={styles.value}>{taskList.length}</p>
            <p className={styles.label}>{tActivity('total')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
