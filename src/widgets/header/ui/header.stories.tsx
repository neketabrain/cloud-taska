import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import { Header } from './index';

export default {
  component: Header,
  args: {
    logoLink: '/',
  },
} as ComponentMeta<typeof Header>;

export const Component: ComponentStory<typeof Header> = (args) => (
  <BrowserRouter>
    <Header {...args} />
  </BrowserRouter>
);
