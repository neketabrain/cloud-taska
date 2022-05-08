import { useStore } from 'effector-react';

import { TaskNormalized } from 'shared/api';

import { $tasks, $currentTask, $currentTaskId } from './store';

export function useTasks(): TaskNormalized[] {
  return useStore($tasks);
}

export function useCurrentTask(): TaskNormalized | undefined {
  return useStore($currentTask);
}

export function useCurrentTaskId(): string | undefined {
  return useStore($currentTaskId);
}
