import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { Button } from 'shared/ui';

import { ConfirmModal } from './index';

export default {
  component: ConfirmModal,
  argTypes: {
    acceptText: {
      defaultValue: 'Accept',
      table: {
        defaultValue: { summary: 'Accept' },
      },
    },
    closeText: {
      defaultValue: 'Close',
      table: {
        defaultValue: { summary: 'Close' },
      },
    },
    rootId: {
      defaultValue: 'modal-root',
      table: {
        defaultValue: { summary: 'modal-root' },
      },
    },
  },
  args: {
    title: 'Confirm modal',
    description: 'Description',
  },
} as ComponentMeta<typeof ConfirmModal>;

export const Component: ComponentStory<typeof ConfirmModal> = (args) => {
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

      {isOpen && <ConfirmModal {...args} close={closeModal} accept={closeModal} />}
    </div>
  );
};
