import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Textarea } from './index';

export default {
  component: Textarea,
  args: {
    label: 'Label',
    placeholder: 'Enter text here...',
  },
} as ComponentMeta<typeof Textarea>;

export const Component: ComponentStory<typeof Textarea> = (args) => <Textarea {...args} />;

export const WithError = Component.bind({});
WithError.args = {
  hasError: true,
};
