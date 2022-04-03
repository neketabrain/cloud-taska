import { useCallback, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { taskModel } from 'entities/task';
import {
  getTasksForToday,
  getTasksForTomorrow,
  getTasksForWeek,
  getTasksForYesterday,
  sortTasksByDate,
} from 'entities/task/lib';
import { TaskRow } from 'entities/task/ui/row';
import { ArrowIcon } from 'shared/assets/icons';
import { ROUTES } from 'shared/config';
import { TextSwitch } from 'shared/ui';

import { filters, PERIODS } from './config';
import styles from './styles.module.scss';

function useTaskFilter() {
  const tasks = taskModel.useTasks();

  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get('period') ?? PERIODS.tomorrow);

  const tasksFiltered = useMemo(() => {
    if (filter === PERIODS.today) {
      return getTasksForToday(tasks);
    }

    if (filter === PERIODS.tomorrow) {
      return getTasksForTomorrow(tasks);
    }

    if (filter === PERIODS.yesterday) {
      return getTasksForYesterday(tasks);
    }

    if (filter === PERIODS.week) {
      return getTasksForWeek(tasks);
    }

    return tasks;
  }, [tasks, filter]);

  const tasksSorted = useMemo(() => sortTasksByDate(tasksFiltered), [tasksFiltered]);

  const changeFilter = useCallback(
    (newFilter: string) => {
      setFilter(newFilter);
      setSearchParams({ period: newFilter });
    },
    [setSearchParams]
  );

  return { filter, changeFilter, tasks: tasksSorted };
}

const TaskList: React.VFC = () => {
  const currentTask = taskModel.useCurrentTask();

  const { filter, changeFilter, tasks } = useTaskFilter();

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <TextSwitch name="period" items={filters} value={filter} onChange={changeFilter} />
        <Link to={ROUTES.tasks} className={styles.link}>
          Все задачи <ArrowIcon />
        </Link>
      </div>

      <ul className={styles.list}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.item}>
            <TaskRow task={task} link={`${ROUTES.tasks}/${task.id}`} isActive={task.id === currentTask?.id} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export { TaskList };
