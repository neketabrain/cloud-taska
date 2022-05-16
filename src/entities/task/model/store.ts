import { isAfter, isBefore, isEqual } from 'date-fns';
import { combine, createStore } from 'effector';

import { TaskNormalized } from 'shared/api';

import { getCurrentTask } from '../lib';

import { getTasksFx, createTaskFx, editTaskFx, deleteTaskFx, toggleTaskFx } from './effects';
import { setQueryConfig } from './events';
import { TasksQueryConfig, TasksQueryCompletedStatuses } from './types';

export const $queryConfig = createStore<TasksQueryConfig>({}).on(setQueryConfig, (_, config) => config);

export const $tasks = createStore<TaskNormalized[]>([])
  .on(getTasksFx.doneData, (_, tasks) => tasks)
  .on(deleteTaskFx.done, (state, { params }) => state.filter((task) => task.id !== params))
  .on(editTaskFx.doneData, (state, editedTask) => {
    if (!editedTask) {
      return state;
    }

    return state.map((task) => {
      if (task.id === editedTask.id) {
        return { ...task, ...editedTask };
      }

      return task;
    });
  })
  .on(toggleTaskFx.doneData, (state, editedTask) => {
    if (!editedTask) {
      return state;
    }

    return state.map((task) => {
      if (task.id === editedTask.id) {
        return { ...task, completed: !task.completed };
      }

      return task;
    });
  })
  .on(createTaskFx.doneData, (state, newTask) => {
    if (!newTask) {
      return state;
    }

    return state.concat(newTask);
  });

export const $currentTask = $tasks.map((state) => getCurrentTask(state));

export const $currentTaskId = $currentTask.map((state) => state?.id);

export const $tasksFiltered = combine($tasks, $queryConfig, (tasks, config) => {
  return tasks.filter((task) => {
    let isIncorrect = false;

    if (config.title && !task.title.toLowerCase().includes(config.title.toLowerCase())) {
      isIncorrect = true;
    }

    if (config.completed) {
      if (config.completed === TasksQueryCompletedStatuses.completed && !task.completed) {
        isIncorrect = true;
      }

      if (config.completed === TasksQueryCompletedStatuses.notCompleted && !!task.completed) {
        isIncorrect = true;
      }
    }

    if (
      config.startDate &&
      isBefore(task.start_date, config.startDate) &&
      !isEqual(task.start_date, config.startDate)
    ) {
      isIncorrect = true;
    }

    if (config.dueDate && isAfter(task.due_date, config.dueDate) && !isEqual(task.due_date, config.dueDate)) {
      isIncorrect = true;
    }

    return !isIncorrect;
  });
});
