import { combine, createStore } from 'effector';

import { TaskNormalized } from 'shared/api';

import { filterTasksByConfig, getCurrentTask, getCompletedTasks, getActiveTasks } from '../lib';

import { getTasksFx, createTaskFx, editTaskFx, deleteTaskFx, toggleTaskFx } from './effects';
import { setQueryConfig, resetQueryConfig } from './events';
import { TasksQueryConfig } from './types';

export const $queryConfig = createStore<TasksQueryConfig>({})
  .on(setQueryConfig, (_, config) => config)
  .reset(resetQueryConfig);

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

export const $completedTasks = $tasks.map(getCompletedTasks);

export const $activeTasks = $tasks.map(getActiveTasks);

export const $tasksFiltered = combine($tasks, $queryConfig, filterTasksByConfig);

export const $currentTask = $tasks.map((state) => getCurrentTask(state) || null);
