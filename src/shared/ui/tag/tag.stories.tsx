import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Tag } from './index';

export default {
  component: Tag,
  args: {
    children: 'Tag',
  },
  argTypes: {
    as: {
      defaultValue: 'p',
      table: {
        defaultValue: { summary: 'p' },
      },
    },
  },
} as ComponentMeta<typeof Tag>;

export const Component: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;
