import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Input } from './index';

export default {
  component: Input,
  args: {
    label: 'Label',
    placeholder: 'Enter text here...',
  },
} as ComponentMeta<typeof Input>;

export const Component: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const WithError = Component.bind({});
WithError.args = {
  hasError: true,
};
