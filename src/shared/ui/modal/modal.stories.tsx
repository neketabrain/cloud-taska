import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { Button } from 'shared/ui';

import { Modal } from './index';

export default {
  component: Modal,
  argTypes: {
    rootId: {
      defaultValue: 'modal-root',
      table: {
        defaultValue: { summary: 'modal-root' },
      },
    },
  },
  args: {
    style: { width: '200px', height: '200px' },
  },
} as ComponentMeta<typeof Modal>;

export const Component: ComponentStory<typeof Modal> = (args) => {
  const [isOpen, setOpen] = useState(false);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <div id="modal-root">
      <Button onClick={openModal}>Open</Button>

      {isOpen && <Modal {...args} close={closeModal} />}
    </div>
  );
};
