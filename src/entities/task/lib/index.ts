import { isAfter, isBefore, isSameWeek, isToday, isTomorrow, isYesterday, setDate } from 'date-fns';

import { Task } from 'shared/api/task';
import { getToday } from 'shared/lib';

export function getTasksForToday(tasks: Task[]): Task[] {
  return tasks.filter((task) => {
    const startDate = new Date(task.start_date);

    return isToday(startDate);
  });
}

export function getTasksForTomorrow(tasks: Task[]): Task[] {
  return tasks.filter((task) => {
    const startDate = new Date(task.start_date);

    return isTomorrow(startDate);
  });
}

export function getTasksForYesterday(tasks: Task[]): Task[] {
  return tasks.filter((task) => {
    const startDate = new Date(task.start_date);

    return isYesterday(startDate);
  });
}

export function getTasksForSevenDays(tasks: Task[], date = getToday()): Task[] {
  const week = setDate(date, date.getDate() + 6);

  return tasks.filter((task) => {
    const startDate = new Date(task.start_date);

    return isAfter(startDate, date) && isBefore(startDate, week);
  });
}

export function getTasksForWeek(tasks: Task[], date = getToday()): Task[] {
  return tasks.filter((task) => {
    const startDate = new Date(task.start_date);

    return isSameWeek(date, startDate, { weekStartsOn: 1 });
  });
}

export function sortTasksByDate(tasks: Task[]): Task[] {
  return tasks.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
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
    const startDate = new Date(task.start_date);
    const dueDate = new Date(task.due_date);

    return isAfter(dueDate, now) && isBefore(startDate, now);
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
