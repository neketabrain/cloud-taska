import { TFunction } from 'react-i18next';

import { taskModel } from 'entities/task';
import { SelectItem } from 'shared/ui';

export const DEFAULT_VALUES: taskModel.types.TasksQueryConfig = {
  title: '',
  startDate: null,
  dueDate: null,
  completed: taskModel.types.TasksQueryCompletedStatuses.all,
};

export function getStatusItems(t: TFunction): SelectItem<taskModel.types.TasksQueryCompletedStatuses>[] {
  return [
    { value: taskModel.types.TasksQueryCompletedStatuses.all, label: t('all') },
    { value: taskModel.types.TasksQueryCompletedStatuses.completed, label: t('completed') },
    { value: taskModel.types.TasksQueryCompletedStatuses.notCompleted, label: t('notCompleted') },
  ];
}
