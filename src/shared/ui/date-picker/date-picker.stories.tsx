import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DatePicker } from './index';

export default {
  component: DatePicker,
  args: {
    label: 'Label',
    placeholder: 'Enter text here...',
  },
} as ComponentMeta<typeof DatePicker>;

export const Component: ComponentStory<typeof DatePicker> = (args) => <DatePicker {...args} />;

export const WithError = Component.bind({});
WithError.args = {
  hasError: true,
};
