import { useStore } from 'effector-react';

import { $tasks, $currentTask } from './store';

function useTasks() {
  return useStore($tasks);
}

function useCurrentTask() {
  return useStore($currentTask);
}

export { useTasks, useCurrentTask };
