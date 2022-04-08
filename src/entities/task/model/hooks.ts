import { useStore } from 'effector-react';

import { $tasks, $currentTask } from './store';

export function useTasks() {
  return useStore($tasks);
}

export function useCurrentTask() {
  return useStore($currentTask);
}
