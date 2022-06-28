import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ViewerMiniProfile } from './index';

export default {
  component: ViewerMiniProfile,
  args: {
    viewer: {
      displayName: 'User Name',
    },
    placement: 'left',
  },
} as ComponentMeta<typeof ViewerMiniProfile>;

export const Component: ComponentStory<typeof ViewerMiniProfile> = (args) => (
  <div style={{ position: 'relative' }}>
    <ViewerMiniProfile {...args} />
  </div>
);
