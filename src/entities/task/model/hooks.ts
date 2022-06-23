import { useStore } from 'effector-react';

import { TaskNormalized } from 'shared/api';

import { $tasks, $completedTasks, $activeTasks, $currentTask, $tasksFiltered } from './store';

export function useTasks(): TaskNormalized[] {
  return useStore($tasks);
}

export function useCompletedTasks(): TaskNormalized[] {
  return useStore($completedTasks);
}

export function useActiveTasks(): TaskNormalized[] {
  return useStore($activeTasks);
}

export function useCurrentTask(): TaskNormalized | null {
  return useStore($currentTask);
}

export function useCurrentTaskId(): string | undefined {
  return useStore($currentTask)?.id;
}

export function useFilteredTasks(): TaskNormalized[] {
  return useStore($tasksFiltered);
}
