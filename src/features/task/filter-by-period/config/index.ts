import { TFunction } from 'react-i18next';

import { taskModel } from 'entities/task';
import { TextSwitchItem } from 'shared/ui';

export function getFilters(t: TFunction): TextSwitchItem<taskModel.types.TasksQueryPeriods>[] {
  return [
    { value: taskModel.types.TasksQueryPeriods.yesterday, label: t('yesterday') },
    { value: taskModel.types.TasksQueryPeriods.today, label: t('today') },
    { value: taskModel.types.TasksQueryPeriods.tomorrow, label: t('tomorrow') },
    { value: taskModel.types.TasksQueryPeriods.week, label: t('week') },
  ];
}
