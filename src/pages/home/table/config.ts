import { TFunction } from 'react-i18next';

import { TextSwitchItem } from 'shared/ui/text-switch';

export const PERIODS = {
  yesterday: 'yesterday',
  today: 'today',
  tomorrow: 'tomorrow',
  week: 'week',
};

export function getFilters(t: TFunction): TextSwitchItem[] {
  return [
    { value: PERIODS.yesterday, label: t('yesterday') },
    { value: PERIODS.today, label: t('today') },
    { value: PERIODS.tomorrow, label: t('tomorrow') },
    { value: PERIODS.week, label: t('week') },
  ];
}
