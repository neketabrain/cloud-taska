import { createEvent } from 'effector';

import { Task } from 'shared/api/task';

export const setTasks = createEvent<Task[]>();
export const addTask = createEvent<Task>();
export const resetTasks = createEvent();
export const toggleTask = createEvent<number>();
