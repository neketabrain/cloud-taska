import { taskModel } from 'entities/task';
import { Task } from 'shared/api/task';
import { CheckIcon } from 'shared/assets/icons';
import { Button } from 'shared/ui';

import styles from './styles.module.scss';

interface ToggleTaskProps {
  task: Task;
}

const ToggleTask: React.VFC<ToggleTaskProps> = (props) => {
  const { task } = props;

  function toggleTask() {
    taskModel.events.toggleTask(task.id);
  }

  return <Button onClick={toggleTask}>{task.completed ? <CheckIcon className={styles.icon} /> : 'Завершить'}</Button>;
};

export { ToggleTask };
