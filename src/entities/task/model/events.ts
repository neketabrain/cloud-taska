import { createEvent } from 'effector';

import { TasksQueryConfig } from './types';

export const setQueryConfig = createEvent<TasksQueryConfig>();
export const resetQueryConfig = createEvent();
