import { createEffect } from 'effector';

import { NewTaskNormalized, TaskNormalized, taskApi } from 'shared/api';

import { normalizeTask } from '../lib';

export const getTasksFx = createEffect(async () => {
  const tasks = await taskApi.fetchTasks();

  if (tasks) {
    return tasks.map(normalizeTask);
  }
});

export const createTaskFx = createEffect(async (data: NewTaskNormalized) => {
  const task = await taskApi.createTask({
    ...data,
    start_date: data.start_date.toISOString(),
    due_date: data.due_date.toISOString(),
  });

  if (task) {
    return normalizeTask(task);
  }
});

export const editTaskFx = createEffect(async (data: TaskNormalized) => {
  const task = await taskApi.editTask({
    ...data,
    start_date: data.start_date.toISOString(),
    due_date: data.due_date.toISOString(),
  });

  if (task) {
    return normalizeTask(task);
  }
});

export const toggleTaskFx = createEffect(async (data: Pick<TaskNormalized, 'id' | 'completed'>) => {
  const task = await taskApi.toggleTask(data);

  if (task) {
    return normalizeTask(task);
  }
});

export const deleteTaskFx = createEffect((id: string) => {
  return taskApi.deleteTask(id);
});
