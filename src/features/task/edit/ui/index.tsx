import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { taskModel } from 'entities/task';
import { NewTaskNormalized, TaskNormalized } from 'shared/api';
import { EditIcon } from 'shared/assets/icons';
import { Button, DropdownMenu, Input, Modal, Textarea, DatePicker } from 'shared/ui';

import { validationSchema } from '../config';

import styles from './styles.module.scss';

interface EditTaskModalProps {
  task: TaskNormalized;
  close: VoidFunction;
  onSubmit: (values: NewTaskNormalized) => void;
  disabled?: boolean;
}

const EditTaskModal: React.VFC<EditTaskModalProps> = (props) => {
  const { task, close, onSubmit, disabled } = props;

  const { t: tActions } = useTranslation('actions');
  const { t: tTask } = useTranslation('task');

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewTaskNormalized>({ defaultValues: task, resolver: yupResolver(validationSchema) });

  const startDate = watch('start_date');
  const dueDate = watch('due_date');

  function handleChangeStartDate(date: Date | null, onChange: (date: Date | null) => void) {
    if (date && date.getTime() >= dueDate.getTime()) {
      const newDueDate = new Date(date);
      newDueDate.setHours(newDueDate.getHours() + 1);
      setValue('due_date', newDueDate);
    }

    onChange(date);
  }

  function handleChangeDueDate(date: Date | null, onChange: (date: Date | null) => void) {
    if (date && date.getTime() <= startDate.getTime()) {
      const newStartDate = new Date(date);
      newStartDate.setHours(newStartDate.getHours() - 1);
      setValue('start_date', newStartDate);
    }

    onChange(date);
  }

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
            <Controller
              name="start_date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label={tTask('startDate')}
                  placeholder={tTask('enterDate')}
                  hasError={!!errors.start_date}
                  selected={field.value}
                  onChange={(value) => handleChangeStartDate(value, field.onChange)}
                  showTimeSelect={true}
                  dateFormat="Pp"
                />
              )}
            />

            <Controller
              name="due_date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label={tTask('dueDate')}
                  placeholder={tTask('enterDate')}
                  hasError={!!errors.due_date}
                  selected={field.value}
                  onChange={(value) => handleChangeDueDate(value, field.onChange)}
                  showTimeSelect={true}
                  dateFormat="Pp"
                />
              )}
            />
          </div>

          <div className={styles.row}>
            <Textarea
              label={tTask('description')}
              placeholder={tTask('enterDescription')}
              rows={8}
              hasError={!!errors.description}
              {...register('description')}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <Button variant="secondary" onClick={close}>
            {tActions('cancel')}
          </Button>

          <Button type="submit" disabled={disabled}>
            {tActions('save')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

interface EditTaskProps {
  task: TaskNormalized;
}

export const EditTask: React.VFC<EditTaskProps> = (props) => {
  const { task } = props;

  const { t } = useTranslation('actions');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPending, setPending] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  async function editTask(values: NewTaskNormalized) {
    setPending(true);
    await taskModel.effects.editTaskFx({ ...task, ...values });
    setPending(false);
    closeModal();
  }

  return (
    <>
      <DropdownMenu.Item onClick={openModal}>
        <EditIcon />
        {t('edit')}
      </DropdownMenu.Item>

      {isModalOpen && <EditTaskModal task={task} close={closeModal} onSubmit={editTask} disabled={isPending} />}
    </>
  );
};
