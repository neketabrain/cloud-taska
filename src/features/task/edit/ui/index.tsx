import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { taskModel } from 'entities/task';
import { NewTask, Task } from 'shared/api/task';
import { EditIcon } from 'shared/assets/icons';
import { Button, DropdownMenu, Input, Modal, Textarea } from 'shared/ui';

import { validationSchema } from '../config';

import styles from './styles.module.scss';

interface CreateTaskModalProps {
  task: Task;
  close: VoidFunction;
  onSubmit: (values: NewTask) => void;
}

const EditTaskModal: React.VFC<CreateTaskModalProps> = (props) => {
  const { task, close, onSubmit } = props;

  const { t: tActions } = useTranslation('actions');
  const { t: tTask } = useTranslation('task');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewTask>({ defaultValues: task, resolver: yupResolver(validationSchema) });

  return (
    <Modal title={tTask('editTask')} close={close} withCloseButton={true}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputs}>
          <div className={styles.row}>
            <Input
              label={tTask('name')}
              placeholder={tTask('enterName')}
              hasError={!!errors.title}
              {...register('title')}
            />
          </div>

          <div className={styles.row}>
            {/* TODO: Сделать Datepicker */}
            <Input
              label={tTask('startDate')}
              placeholder={tTask('enterDate')}
              hasError={!!errors.start_date}
              type="datetime-local"
              {...register('start_date')}
            />

            {/* TODO: Сделать Datepicker */}
            <Input
              label={tTask('dueDate')}
              placeholder={tTask('enterDate')}
              hasError={!!errors.due_date}
              type="datetime-local"
              {...register('due_date')}
            />
          </div>

          <div className={styles.row}>
            <Textarea
              label={tTask('description')}
              placeholder={tTask('enterDescription')}
              rows={5}
              hasError={!!errors.description}
              {...register('description')}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <Button variant="secondary" onClick={close}>
            {tActions('cancel')}
          </Button>

          <Button type="submit">{tActions('save')}</Button>
        </div>
      </form>
    </Modal>
  );
};

interface EditTaskProps {
  task: Task;
}

export const EditTask: React.VFC<EditTaskProps> = (props) => {
  const { task } = props;

  const { t } = useTranslation('actions');
  const [isModalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function editTask(values: NewTask) {
    taskModel.events.editTask({ ...task, ...values });
    closeModal();
  }

  return (
    <>
      <DropdownMenu.Item onClick={openModal}>
        <EditIcon />
        {t('edit')}
      </DropdownMenu.Item>

      {isModalOpen && <EditTaskModal task={task} close={closeModal} onSubmit={editTask} />}
    </>
  );
};
