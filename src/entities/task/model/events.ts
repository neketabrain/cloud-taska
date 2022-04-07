import { createEvent } from 'effector';

import { Task } from 'shared/api/task';

const setTasks = createEvent<Task[]>();
const addTask = createEvent<Task>();
const resetTasks = createEvent();
const toggleTask = createEvent<number>();

export { setTasks, addTask, resetTasks, toggleTask };
