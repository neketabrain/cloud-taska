import { ComponentMeta, ComponentStory } from '@storybook/react';

import { BarChart } from './index';

export default {
  component: BarChart,
  args: {
    data: [
      {
        label: '1',
        value: 20,
        active: false,
        foregroundValue: 30,
        tooltip: '20/30',
      },
      {
        label: '2',
        value: 32,
        active: true,
        foregroundValue: 80,
        tooltip: '32/80',
      },
      {
        label: '3',
        value: 12,
        active: false,
        foregroundValue: 30,
        tooltip: '12/30',
      },
      {
        label: '4',
        value: 0,
        active: false,
        foregroundValue: 65,
        tooltip: '0/65',
      },
      {
        label: '5',
        value: 12,
        active: false,
        foregroundValue: 12,
        tooltip: '12/12',
      },
    ],
  },
} as ComponentMeta<typeof BarChart>;

export const Component: ComponentStory<typeof BarChart> = (args) => <BarChart {...args} />;
