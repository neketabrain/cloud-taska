import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import { MobileMenu } from './index';

export default {
  component: MobileMenu,
  args: {
    items: [
      { label: 'Link 1', link: '/1' },
      { label: 'Link 2', link: '/2' },
      { label: 'Link 3', link: '/3' },
    ],
  },
} as ComponentMeta<typeof MobileMenu>;

export const Component: ComponentStory<typeof MobileMenu> = (args) => (
  <BrowserRouter>
    <MobileMenu {...args} />
  </BrowserRouter>
);
