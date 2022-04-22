import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { TextSwitch } from './index';

export default {
  component: TextSwitch,
  args: {
    name: 'switch',
    items: [
      { label: 'First', value: '1' },
      { label: 'Second', value: '2' },
      { label: 'Third', value: '3' },
    ],
  },
} as ComponentMeta<typeof TextSwitch>;

export const Component: ComponentStory<typeof TextSwitch> = (args) => {
  const [value, setValue] = useState('1');

  function handleChange(newValue: string) {
    setValue(newValue);
  }

  return <TextSwitch {...args} value={value} onChange={handleChange} />;
};
