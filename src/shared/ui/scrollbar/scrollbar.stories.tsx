import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Scrollbar } from './index';

export default {
  component: Scrollbar,
  argTypes: {
    variant: {
      defaultValue: 'dark',
      table: {
        defaultValue: { summary: 'dark' },
      },
    },
    className: {
      control: 'text',
      type: { name: 'string', required: false },
      table: {
        type: { summary: 'string' },
      },
    },
    style: {
      control: 'object',
      type: { name: 'string', required: false },
      table: {
        type: { summary: 'CSSProperties' },
      },
    },
  },
} as ComponentMeta<typeof Scrollbar>;

export const Component: ComponentStory<typeof Scrollbar> = (args) => (
  <Scrollbar {...args}>
    <div style={{ display: 'flex' }}>
      {Array(10)
        .fill(null)
        .map((_, idx) => (
          <div
            key={idx}
            style={{ width: '200px', height: '200px', marginRight: '16px', backgroundColor: 'blue', flexShrink: 0 }}
          />
        ))}
    </div>
  </Scrollbar>
);
