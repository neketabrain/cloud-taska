import { useTranslation } from 'react-i18next';

import { Task } from 'shared/api/task';
import { EditIcon } from 'shared/assets/icons';
import { DropdownMenu } from 'shared/ui';

interface EditTaskModalProps {
  task: Task;
}

// TODO: Редактирование задачи
export const EditTaskModal: React.VFC<EditTaskModalProps> = (props) => {
  // const { task } = props;

  const { t } = useTranslation('actions');

  return (
    <DropdownMenu.Item>
      <EditIcon />
      {t('edit')}
    </DropdownMenu.Item>
  );
};
