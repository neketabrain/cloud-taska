import { isAfter, isBefore, isDate, isSameWeek, isToday, isTomorrow, isYesterday, setDate } from 'date-fns';

import { Task, TaskNormalized } from 'shared/api';
import { formatDate, getToday } from 'shared/lib';

import { types } from '../model';

export function normalizeTask(task: Task): TaskNormalized {
  return {
    ...task,
    start_date: new Date(task.start_date),
    due_date: new Date(task.due_date),
  };
}

export function getTasksForToday(tasks: TaskNormalized[]): TaskNormalized[] {
  return tasks.filter((task) => {
    return isToday(task.start_date);
  });
}

export function getTasksForTomorrow(tasks: TaskNormalized[]): TaskNormalized[] {
  return tasks.filter((task) => {
    return isTomorrow(task.start_date);
  });
}

export function getTasksForYesterday(tasks: TaskNormalized[]): TaskNormalized[] {
  return tasks.filter((task) => {
    return isYesterday(task.start_date);
  });
}

export function getTasksForSevenDays(tasks: TaskNormalized[], date = getToday()): TaskNormalized[] {
  const week = setDate(date, date.getDate() + 6);

  return tasks.filter((task) => {
    return isAfter(task.start_date, date) && isBefore(task.start_date, week);
  });
}

export function getTasksForWeek(tasks: TaskNormalized[], date = getToday()): TaskNormalized[] {
  return tasks.filter((task) => {
    return isSameWeek(date, task.start_date, { weekStartsOn: 1 });
  });
}

export function sortTasksByDate(tasks: TaskNormalized[]): TaskNormalized[] {
  return tasks.sort((a, b) => a.start_date.getTime() - b.start_date.getTime());
}

export function getActiveTasks(tasks: TaskNormalized[]): TaskNormalized[] {
  return tasks.filter((task) => !task.completed);
}

export function getCompletedTasks(tasks: TaskNormalized[]): TaskNormalized[] {
  return tasks.filter((task) => task.completed);
}

export function getCurrentTasks(tasks: TaskNormalized[]): TaskNormalized[] {
  const now = Date.now();

  return tasks.filter((task) => {
    return isAfter(task.due_date, now) && isBefore(task.start_date, now);
  });
}

export function getCurrentTask(tasks: TaskNormalized[]): TaskNormalized | undefined {
  const currentTasks = getCurrentTasks(tasks);
  const sortedTasks = sortTasksByDate(currentTasks);
  const activeTasks = getActiveTasks(sortedTasks);

  if (activeTasks.length) {
    return activeTasks.at(0);
  }

  return sortedTasks.at(-1);
}

export function getSearchParamsFromConfig(filters: types.TasksQueryConfig): Record<string, string> {
  const values: Record<string, string> = {};

  if (filters.title) {
    values.title = filters.title;
  }

  if (filters.completed && filters.completed !== 'all') {
    values.completed = filters.completed;
  }

  if (filters.startDate) {
    values.startDate = formatDate(filters.startDate, 'yyyy-MM-dd');
  }

  if (filters.dueDate) {
    values.dueDate = formatDate(filters.dueDate, 'yyyy-MM-dd');
  }

  return values;
}

export function getQueryConfigFromParams(searchParams: URLSearchParams): types.TasksQueryConfig {
  const values: types.TasksQueryConfig = {};

  const title = searchParams.get('title');
  const completed = searchParams.get('completed') as types.TasksQueryCompletedStatuses | null;
  const start = searchParams.get('startDate');
  const startDate = start && new Date(start);
  const due = searchParams.get('dueDate');
  const dueDate = due && new Date(due);

  if (title) {
    values.title = title;
  }

  if (completed && Object.values(types.TasksQueryCompletedStatuses).includes(completed)) {
    values.completed = completed;
  }

  if (startDate && isDate(startDate)) {
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);

    values.startDate = new Date(startDate);
  }

  if (dueDate && isDate(dueDate)) {
    dueDate.setHours(23);
    dueDate.setMinutes(59);
    dueDate.setSeconds(59);
    dueDate.setMilliseconds(999);

    values.dueDate = new Date(dueDate);
  }

  return values;
}
