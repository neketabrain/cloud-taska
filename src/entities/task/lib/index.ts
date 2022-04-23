import { isAfter, isBefore, isSameWeek, isToday, isTomorrow, isYesterday, setDate } from 'date-fns';

import { Task } from 'shared/api/task';
import { getToday } from 'shared/lib';

export function getTasksForToday(tasks: Task[]): Task[] {
  return tasks.filter((task) => {
    return isToday(task.start_date);
  });
}

export function getTasksForTomorrow(tasks: Task[]): Task[] {
  return tasks.filter((task) => {
    return isTomorrow(task.start_date);
  });
}

export function getTasksForYesterday(tasks: Task[]): Task[] {
  return tasks.filter((task) => {
    return isYesterday(task.start_date);
  });
}

export function getTasksForSevenDays(tasks: Task[], date = getToday()): Task[] {
  const week = setDate(date, date.getDate() + 6);

  return tasks.filter((task) => {
    return isAfter(task.start_date, date) && isBefore(task.start_date, week);
  });
}

export function getTasksForWeek(tasks: Task[], date = getToday()): Task[] {
  return tasks.filter((task) => {
    return isSameWeek(date, task.start_date, { weekStartsOn: 1 });
  });
}

export function sortTasksByDate(tasks: Task[]): Task[] {
  return tasks.sort((a, b) => a.start_date.getTime() - b.start_date.getTime());
}

export function getActiveTasks(tasks: Task[]): Task[] {
  return tasks.filter((task) => !task.completed);
}

export function getCompletedTasks(tasks: Task[]): Task[] {
  return tasks.filter((task) => task.completed);
}

export function getCurrentTasks(tasks: Task[]): Task[] {
  const now = Date.now();

  return tasks.filter((task) => {
    return isAfter(task.due_date, now) && isBefore(task.start_date, now);
  });
}

export function getCurrentTask(tasks: Task[]): Task | undefined {
  const currentTasks = getCurrentTasks(tasks);
  const sortedTasks = sortTasksByDate(currentTasks);
  const activeTasks = getActiveTasks(sortedTasks);

  if (activeTasks.length) {
    return activeTasks[0];
  }

  return sortedTasks.at(-1);
}
