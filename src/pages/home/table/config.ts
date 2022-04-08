import { TextSwitchItem } from 'shared/ui/text-switch';

export const PERIODS = {
  yesterday: 'yesterday',
  today: 'today',
  tomorrow: 'tomorrow',
  week: 'week',
};

export const filters: TextSwitchItem[] = [
  { value: PERIODS.yesterday, label: 'вчера' },
  { value: PERIODS.today, label: 'сегодня' },
  { value: PERIODS.tomorrow, label: 'завтра' },
  { value: PERIODS.week, label: 'неделя' },
];
