import { createStore } from 'effector';

import { Task } from 'shared/api/task';

import { getCurrentTask } from '../lib';

import { resetTasks, setTasks, toggleTask, updateTask } from './events';

// TODO: удалить
const defaultState: Task[] = [
  {
    id: 1,
    title: 'Завтрак',
    description: 'Приготовить завтрак',
    start_date: new Date(2022, 3, 3, 10, 0).toISOString(),
    due_date: new Date(2022, 3, 3, 10, 30).toISOString(),
  },
  {
    id: 2,
    title: 'Совещание',
    description: 'Совещание',
    start_date: new Date(2022, 3, 3, 13, 30).toISOString(),
    due_date: new Date(2022, 3, 3, 13, 50).toISOString(),
  },
  {
    id: 3,
    title: 'Пет-проект',
    description: 'Нарисовать макет для пет-проекта Cloud Taska',
    start_date: new Date(2022, 3, 3, 16, 0).toISOString(),
    due_date: new Date(2022, 3, 3, 17, 30).toISOString(),
  },
  {
    id: 4,
    title: 'Пробежка',
    description: 'Сходить на пробежку в парк',
    start_date: new Date(2022, 3, 3, 20, 0).toISOString(),
    due_date: new Date(2022, 3, 3, 21, 0).toISOString(),
  },
  {
    id: 5,
    title: 'Вчерашний завтрак',
    description: 'Приготовить завтрак Вчерашний завтра Вчерашний завтра Вчерашний завтра Вчерашний завтра',
    start_date: new Date(2022, 3, 2, 10, 0).toISOString(),
    due_date: new Date(2022, 3, 2, 10, 30).toISOString(),
  },
  {
    id: 6,
    title: 'Завтрашний ужин',
    description: 'Приготовить завтра ужин',
    start_date: new Date(2022, 3, 4, 10, 0).toISOString(),
    due_date: new Date(2022, 3, 4, 10, 30).toISOString(),
  },
  {
    id: 7,
    title: 'Пробежка 3',
    description: 'Сходить на пробежку в парк',
    start_date: new Date(2022, 3, 3, 19, 0).toISOString(),
    due_date: new Date(2022, 3, 3, 21, 0).toISOString(),
  },
  {
    id: 8,
    title: 'Пробежка 2',
    description: 'Сходить на пробежку в парк',
    start_date: new Date(2022, 3, 3, 19, 40).toISOString(),
    due_date: new Date(2022, 3, 3, 23, 59).toISOString(),
  },
];

const $tasks = createStore<Task[]>(defaultState)
  .on(setTasks, (_, tasks) => tasks)
  .on(updateTask, (state, task) => [...state, task])
  .on(toggleTask, (state, taskId) =>
    state.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    })
  )
  .reset(resetTasks);

const $currentTask = $tasks.map((state) => {
  return getCurrentTask(state);
});

export { $tasks, $currentTask };
