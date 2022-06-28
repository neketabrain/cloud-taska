import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Loader } from './index';

export default {
  component: Loader,
} as ComponentMeta<typeof Loader>;

export const Component: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;
