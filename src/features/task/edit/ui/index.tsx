import { useTranslation } from 'react-i18next';

import { Task } from 'shared/api/task';
import { EditIcon } from 'shared/assets/icons';
import { DropdownMenu } from 'shared/ui';

interface EditTaskProps {
  task: Task;
}

// TODO: Редактирование задачи
export const EditTask: React.VFC<EditTaskProps> = (props) => {
  // const { task } = props;

  const { t } = useTranslation('actions');

  return (
    <DropdownMenu.Item>
      <EditIcon />
      {t('edit')}
    </DropdownMenu.Item>
  );
};
