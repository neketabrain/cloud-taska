import { createStore } from 'effector';

import { Task } from 'shared/api/task';

import { getCurrentTask } from '../lib';

import { resetTasks, setTasks, toggleTask, addTask } from './events';

// TODO: удалить
const today = new Date();

// TODO: удалить
function generateTasks(count: number, day = today.getDate(), startTime = 10): Task[] {
  return new Array(count).fill(null).map((_, idx): Task => {
    const date = new Date();
    date.setDate(day);
    date.setHours(startTime + idx);
    date.setMinutes(0);

    const dueDate = new Date(date);
    dueDate.setHours(date.getHours() + 1);

    return {
      id: date.getTime(),
      title: `Задача ${idx + 1}`,
      description: `Описание задачи ${idx + 1}`,
      start_date: date.toISOString(),
      due_date: dueDate.toISOString(),
    };
  });
}

// TODO: удалить
const defaultState: Task[] = [
  ...generateTasks(3, today.getDate() - 1),
  ...generateTasks(14),
  ...generateTasks(4, today.getDate() + 1),
];

export const $tasks = createStore<Task[]>(defaultState)
  .on(setTasks, (_, tasks) => tasks)
  .on(addTask, (state, task) => state.concat(task))
  .on(toggleTask, (state, taskId) =>
    state.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }

      return task;
    })
  )
  .reset(resetTasks);

export const $currentTask = $tasks.map((state) => getCurrentTask(state));
