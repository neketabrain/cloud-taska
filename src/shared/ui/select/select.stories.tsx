import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';

import { Select } from './index';

export default {
  component: Select,
  args: {
    label: 'Label',
    placeholder: 'Select value',
    items: [
      { value: '1', label: 'First' },
      { value: '2', label: 'Second' },
    ],
  },
} as ComponentMeta<typeof Select>;

export const Component: ComponentStory<typeof Select> = (args) => {
  const [value, setValue] = useState('');

  return (
    <div style={{ height: '300px' }}>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <Select
          {...args}
          value={value}
          onChange={setValue}
          items={[
            { value: '1', label: 'First' },
            { value: '2', label: 'Second' },
          ]}
        />
      </div>
    </div>
  );
};

export const WithError = Component.bind({});
WithError.args = {
  hasError: true,
};
