import { yupResolver } from '@hookform/resolvers/yup';
import { setHours } from 'date-fns';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { taskModel } from 'entities/task';
import { NewTaskNormalized } from 'shared/api';
import { PlusIcon } from 'shared/assets/icons';
import { Button, Input, Modal, Textarea, DatePicker } from 'shared/ui';

import { validationSchema } from '../config';

import styles from './styles.module.scss';

interface CreateTaskModalProps {
  close: VoidFunction;
  onSubmit: (values: NewTaskNormalized) => void;
  disabled?: boolean;
}

const CreateTaskModal: React.VFC<CreateTaskModalProps> = (props) => {
  const { close, onSubmit, disabled } = props;

  const { t: tActions } = useTranslation('actions');
  const { t: tTask } = useTranslation('task');

  const now = new Date();

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewTaskNormalized>({
    defaultValues: { start_date: now, due_date: setHours(now, now.getHours() + 1) },
    resolver: yupResolver(validationSchema),
  });

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
    <Modal title={tTask('addTask')} close={close} withCloseButton={true}>
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
            {tActions('create')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export const CreateTask: React.VFC = () => {
  const { t } = useTranslation('task');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPending, setPending] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  async function createTask(values: NewTaskNormalized) {
    setPending(true);
    await taskModel.effects.createTaskFx(values);
    setPending(false);
    closeModal();
  }

  return (
    <>
      <Button className={styles.button} onClick={openModal}>
        <PlusIcon /> <span>{t('addTask')}</span>
      </Button>

      {isModalOpen && <CreateTaskModal close={closeModal} onSubmit={createTask} disabled={isPending} />}
    </>
  );
};
