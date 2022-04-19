import { taskModel } from 'entities/task';
import { DeleteIcon } from 'shared/assets/icons';
import { DropdownMenu } from 'shared/ui';

interface DeleteTaskProps {
  taskId: number;
}

// TODO: Запрашивать подтверждение
export const DeleteTask: React.VFC<DeleteTaskProps> = (props) => {
  const { taskId } = props;

  function handleDelete() {
    taskModel.events.deleteTask(taskId);
  }

  return (
    <DropdownMenu.Item onClick={handleDelete} danger>
      <DeleteIcon />
      Удалить
    </DropdownMenu.Item>
  );
};
