import { TFunction } from 'react-i18next';

import { taskModel } from 'entities/task';
import { TextSwitchItem } from 'shared/ui';

export function getFilters(
  t: TFunction,
  allTasksLink: string
): TextSwitchItem<taskModel.types.TasksQueryPeriods | string>[] {
  return [
    { value: taskModel.types.TasksQueryPeriods.yesterday, label: t('yesterday') },
    { value: taskModel.types.TasksQueryPeriods.today, label: t('today') },
    { value: taskModel.types.TasksQueryPeriods.tomorrow, label: t('tomorrow') },
    { value: taskModel.types.TasksQueryPeriods.week, label: t('week') },
    { value: allTasksLink, label: t('all'), asLink: true },
  ];
}
