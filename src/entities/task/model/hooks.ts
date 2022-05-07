import { useStore } from 'effector-react';

import { Task } from 'shared/api';

import { $tasks, $currentTask, $currentTaskId } from './store';

export function useTasks(): Task[] {
  return useStore($tasks);
}

export function useCurrentTask(): Task | undefined {
  return useStore($currentTask);
}

export function useCurrentTaskId(): string | undefined {
  return useStore($currentTaskId);
}
