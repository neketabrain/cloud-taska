import { useState } from 'react';

import { taskModel } from 'entities/task';
import { DeleteIcon } from 'shared/assets/icons';
import { DropdownMenu, ConfirmModal } from 'shared/ui';

interface DeleteTaskProps {
  taskId: number;
}

export const DeleteTask: React.VFC<DeleteTaskProps> = (props) => {
  const { taskId } = props;

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
      <DropdownMenu.Item onClick={openModal} danger>
        <DeleteIcon />
        Удалить
      </DropdownMenu.Item>

      {isModalOpen && (
        <ConfirmModal
          close={closeModal}
          accept={deleteTask}
          title="Удаление задачи"
          description="Вы уверены, что хотите удалить задачу? Это действие не может быть отменено"
        />
      )}
    </>
  );
};
