import { useStore } from 'effector-react';

import { $tasks, $currentTask, $currentTaskId } from './store';

export function useTasks() {
  return useStore($tasks);
}

export function useCurrentTask() {
  return useStore($currentTask);
}

export function useCurrentTaskId() {
  return useStore($currentTaskId);
}
