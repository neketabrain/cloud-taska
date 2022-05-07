import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from 'shared/ui';

import { TaskCard } from './index';

export default {
  component: TaskCard,
  args: {
    label: 'Current task',
    task: {
      id: '1',
      title: 'Task',
      description: 'Description',
      start_date: new Date(),
      due_date: new Date(),
      completed: false,
    },
  },
} as ComponentMeta<typeof TaskCard>;

export const Component: ComponentStory<typeof TaskCard> = (args) => <TaskCard {...args} />;

export const WithAction = Component.bind({});
WithAction.args = {
  action: <Button style={{ width: '100%' }}>Action</Button>,
};
