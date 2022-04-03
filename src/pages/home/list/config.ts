import { TextSwitchItem } from 'shared/ui/text-switch';

const PERIODS = {
  yesterday: 'yesterday',
  today: 'today',
  tomorrow: 'tomorrow',
  week: 'week',
};

const filters: TextSwitchItem[] = [
  { value: PERIODS.yesterday, label: 'вчера' },
  { value: PERIODS.today, label: 'сегодня' },
  { value: PERIODS.tomorrow, label: 'завтра' },
  { value: PERIODS.week, label: 'неделя' },
];

export { PERIODS, filters };
