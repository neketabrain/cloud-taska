import { createEvent } from 'effector';

import { Task } from 'shared/api';

export const setTasks = createEvent<Task[]>();
export const resetTasks = createEvent();
export const addTask = createEvent<Task>();
export const editTask = createEvent<Task>();
export const toggleTask = createEvent<string>();
export const deleteTask = createEvent<string>();
