import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Tooltip } from './index';

export default {
  component: Tooltip,
  args: {
    overlay: 'Tooltip',
    children: <p>Hover me</p>,
  },
} as ComponentMeta<typeof Tooltip>;

export const Component: ComponentStory<typeof Tooltip> = (args) => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Tooltip {...args} />
  </div>
);
