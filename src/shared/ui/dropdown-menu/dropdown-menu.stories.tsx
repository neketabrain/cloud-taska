import { ComponentMeta, ComponentStory } from '@storybook/react';

import { DropdownMenu } from './index';

export default {
  component: DropdownMenu,
  argTypes: {
    placement: {
      defaultValue: 'right',
      table: {
        defaultValue: { summary: 'right' },
      },
    },
  },
  args: {
    items: [
      <DropdownMenu.Item>Item 1</DropdownMenu.Item>,
      <DropdownMenu.Item>Item 2</DropdownMenu.Item>,
      <DropdownMenu.Item danger>Item 3</DropdownMenu.Item>,
    ],
  },
} as ComponentMeta<typeof DropdownMenu>;

export const Component: ComponentStory<typeof DropdownMenu> = (args) => (
  <div style={{ height: '300px' }}>
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
      <DropdownMenu {...args} />
    </div>
  </div>
);
