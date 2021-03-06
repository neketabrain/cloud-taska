import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { taskModel } from 'entities/task';
import { DeleteIcon } from 'shared/assets/icons';
import { DropdownMenu, ConfirmModal } from 'shared/ui';

interface DeleteTaskProps {
  taskId: string;
}

export const DeleteTask: React.FC<DeleteTaskProps> = (props) => {
  const { taskId } = props;

  const { t: tActions } = useTranslation('actions');
  const { t: tTask } = useTranslation('task');

  const [isModalOpen, setModalOpen] = useState(false);
  const [isPending, setPending] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  async function deleteTask() {
    setPending(true);
    await taskModel.effects.deleteTaskFx(taskId);
    setPending(false);
    closeModal();
  }

  return (
    <>
      <DropdownMenu.Item onClick={openModal} danger={true}>
        <DeleteIcon />
        {tActions('delete')}
      </DropdownMenu.Item>

      {isModalOpen && (
        <ConfirmModal
          cancel={closeModal}
          accept={deleteTask}
          acceptText={tActions('delete')}
          title={tTask('deleteTask')}
          description={tTask('deleteTaskConfirmation')}
          disabled={isPending}
        />
      )}
    </>
  );
};
