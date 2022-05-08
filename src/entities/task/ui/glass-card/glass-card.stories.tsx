import { ComponentMeta, ComponentStory } from '@storybook/react';

import { TaskGlassCard } from './index';

export default {
  component: TaskGlassCard,
  args: {
    label: 'Current task',
    task: {
      id: '1',
      owner_id: '1',
      title: 'Task',
      description: 'Description',
      start_date: new Date(),
      due_date: new Date(),
      completed: false,
    },
  },
} as ComponentMeta<typeof TaskGlassCard>;

export const Component: ComponentStory<typeof TaskGlassCard> = (args) => (
  <div style={{ backgroundColor: '#333333', padding: '16px' }}>
    <TaskGlassCard {...args} />
  </div>
);
