import { Task } from 'shared/api/task';
import { EditIcon } from 'shared/assets/icons';
import { DropdownMenu } from 'shared/ui';

interface EditTaskModalProps {
  task: Task;
}

// TODO: Редактирование задачи
export const EditTaskModal: React.VFC<EditTaskModalProps> = (props) => {
  // const { task } = props;

  return (
    <DropdownMenu.Item>
      <EditIcon />
      Редактировать
    </DropdownMenu.Item>
  );
};
