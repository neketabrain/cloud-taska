import { useCallback, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { taskModel, TaskRow, taskLib } from 'entities/task';
import { PlusIcon } from 'shared/assets/icons';
import { ROUTES } from 'shared/config';
import { Button, TextSwitch } from 'shared/ui';

import { filters, PERIODS } from './config';
import styles from './styles.module.scss';

function useTaskFilter() {
  const tasks = taskModel.useTasks();

  const [searchParams, setSearchParams] = useSearchParams();
  const period = searchParams.get('period') || PERIODS.tomorrow;

  const filteredTasks = useMemo(() => {
    if (period === PERIODS.today) {
      return taskLib.getTasksForToday(tasks);
    }

    if (period === PERIODS.tomorrow) {
      return taskLib.getTasksForTomorrow(tasks);
    }

    if (period === PERIODS.yesterday) {
      return taskLib.getTasksForYesterday(tasks);
    }

    if (period === PERIODS.week) {
      return taskLib.getTasksForSevenDays(tasks);
    }

    return tasks;
  }, [tasks, period]);

  const sortedTasks = useMemo(() => taskLib.sortTasksByDate(filteredTasks), [filteredTasks]);

  const changeFilter = useCallback(
    (newFilter: string) => {
      setSearchParams({ period: newFilter });
    },
    [setSearchParams]
  );

  useEffect(() => {
    if (!Object.values(PERIODS).includes(period)) {
      setSearchParams({ period: PERIODS.tomorrow });
    }
  }, [period, setSearchParams]);

  return { period, changeFilter, tasks: sortedTasks };
}

export const TaskTable: React.VFC = () => {
  const currentTask = taskModel.useCurrentTask();

  const { period, changeFilter, tasks } = useTaskFilter();

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.switch}>
          <TextSwitch name="period" items={filters} value={period} onChange={changeFilter} />

          <p className={styles.separator}>{' / '}</p>
          <Link to={ROUTES.tasks} className={styles.allTasksLink}>
            Все
          </Link>
        </div>

        <Button className={styles.addTaskButton}>
          <PlusIcon /> Добавить задачу
        </Button>
      </div>

      <ul className={styles.list}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.item}>
            <TaskRow task={task} link={`${ROUTES.tasks}/${task.id}`} active={task.id === currentTask?.id} />
          </li>
        ))}
      </ul>
    </section>
  );
};
