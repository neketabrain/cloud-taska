import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './index';

export default {
  component: Button,
  argTypes: {
    variant: {
      defaultValue: 'primary',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
  },
  args: {
    children: 'Button',
  },
} as ComponentMeta<typeof Button>;

const Component: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Component.bind({});
Primary.args = {
  variant: 'primary',
};

export const Secondary = Component.bind({});
Secondary.args = {
  variant: 'secondary',
};

export const Transparent = Component.bind({});
Transparent.args = {
  variant: 'transparent',
};
