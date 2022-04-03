import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isToday from 'date-fns/isToday';
import isTomorrow from 'date-fns/isTomorrow';
import isYesterday from 'date-fns/isYesterday';
import setDate from 'date-fns/setDate';

import { Task } from 'shared/api/task';
import { getToday } from 'shared/lib';

function getTasksForToday(tasks: Task[]): Task[] {
  return tasks.filter((task) => {
    const startDate = new Date(task.start_date);

    return isToday(startDate);
  });
}

function getTasksForTomorrow(tasks: Task[]): Task[] {
  return tasks.filter((task) => {
    const startDate = new Date(task.start_date);

    return isTomorrow(startDate);
  });
}

function getTasksForYesterday(tasks: Task[]): Task[] {
  return tasks.filter((task) => {
    const startDate = new Date(task.start_date);

    return isYesterday(startDate);
  });
}

function getTasksForWeek(tasks: Task[]): Task[] {
  const today = getToday();
  const week = setDate(today, today.getDate() + 7);

  return tasks.filter((task) => {
    const startDate = new Date(task.start_date);

    return isAfter(startDate, today) && isBefore(startDate, week);
  });
}

function sortTasksByDate(tasks: Task[]): Task[] {
  return tasks.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
}

function getActiveTasks(tasks: Task[]): Task[] {
  return tasks.filter((task) => !task.completed);
}

function getCompletedTasks(tasks: Task[]): Task[] {
  return tasks.filter((task) => task.completed);
}

function getCurrentTasks(tasks: Task[]): Task[] {
  const now = Date.now();

  return tasks.filter((task) => {
    const startDate = new Date(task.start_date);
    const dueDate = new Date(task.due_date);

    return isAfter(dueDate, now) && isBefore(startDate, now);
  });
}

function getCurrentTask(tasks: Task[]): Task | undefined {
  const currentTasks = getCurrentTasks(tasks);
  const sortedTasks = sortTasksByDate(currentTasks);
  const activeTasks = getActiveTasks(sortedTasks);

  if (activeTasks.length) {
    return activeTasks[0];
  }

  return sortedTasks.at(-1);
}

export {
  getTasksForToday,
  getTasksForTomorrow,
  getTasksForYesterday,
  getTasksForWeek,
  sortTasksByDate,
  getCurrentTask,
  getActiveTasks,
  getCompletedTasks,
  getCurrentTasks,
};
