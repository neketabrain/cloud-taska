import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Logo } from './index';

export default {
  component: Logo,
  argTypes: {
    as: {
      defaultValue: 'h1',
      table: {
        defaultValue: { summary: 'h1' },
      },
    },
  },
} as ComponentMeta<typeof Logo>;

export const Component: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;
