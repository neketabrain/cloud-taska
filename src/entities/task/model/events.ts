import { createEvent } from 'effector';

import { Task } from 'shared/api/task';

export const setTasks = createEvent<Task[]>();
export const resetTasks = createEvent();
export const addTask = createEvent<Task>();
export const editTask = createEvent<Task>();
export const toggleTask = createEvent<number>();
export const deleteTask = createEvent<number>();
