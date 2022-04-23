import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { taskModel } from 'entities/task';
import { DeleteIcon } from 'shared/assets/icons';
import { DropdownMenu, ConfirmModal } from 'shared/ui';

interface DeleteTaskProps {
  taskId: number;
}

export const DeleteTask: React.VFC<DeleteTaskProps> = (props) => {
  const { taskId } = props;

  const { t: tActions } = useTranslation('actions');
  const { t: tTask } = useTranslation('task');
  const [isModalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function deleteTask() {
    taskModel.events.deleteTask(taskId);
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
        />
      )}
    </>
  );
};
