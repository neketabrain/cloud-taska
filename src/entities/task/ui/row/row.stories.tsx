import { ComponentMeta, ComponentStory } from '@storybook/react';

import { DropdownMenu } from 'shared/ui';

import { TaskRow } from './index';

export default {
  component: TaskRow,
  args: {
    label: 'Current task',
    task: {
      id: 1,
      title: 'Task',
      description: 'Description',
      start_date: new Date().toString(),
      due_date: new Date().toString(),
      completed: false,
    },
  },
} as ComponentMeta<typeof TaskRow>;

export const Component: ComponentStory<typeof TaskRow> = (args) => (
  <div style={{ height: '200px' }}>
    <TaskRow {...args} />
  </div>
);

export const WithAction = Component.bind({});
WithAction.args = {
  actions: [
    <DropdownMenu.Item>Item 1</DropdownMenu.Item>,
    <DropdownMenu.Item>Item 2</DropdownMenu.Item>,
    <DropdownMenu.Item danger>Item 3</DropdownMenu.Item>,
  ],
};
