import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Dropdown } from './index';

export default {
  component: Dropdown,
  argTypes: {
    placement: {
      defaultValue: 'right',
      table: {
        defaultValue: { summary: 'right' },
      },
    },
  },
  args: {
    contentStyle: { width: '200px', height: '200px' },
  },
} as ComponentMeta<typeof Dropdown>;

export const Component: ComponentStory<typeof Dropdown> = (args) => (
  <div style={{ height: '300px' }}>
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
      <Dropdown {...args} />
    </div>
  </div>
);

export const WithCustomElement = Component.bind({});
WithCustomElement.args = {
  element: (actions) => (
    <button
      onClick={actions.toggle}
      style={{ backgroundColor: 'orange', padding: '8px 16px', border: 'none', cursor: 'pointer' }}
    >
      Open
    </button>
  ),
};
