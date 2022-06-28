import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ViewerAvatar } from './index';

export default {
  component: ViewerAvatar,
  args: {
    viewer: {
      displayName: 'User Name',
    },
  },
} as ComponentMeta<typeof ViewerAvatar>;

export const Component: ComponentStory<typeof ViewerAvatar> = (args) => <ViewerAvatar {...args} />;
