import { yupResolver } from '@hookform/resolvers/yup';
import { setHours } from 'date-fns';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { taskModel } from 'entities/task';
import { NewTask } from 'shared/api/task';
import { PlusIcon } from 'shared/assets/icons';
import { Button, Input, Modal, Textarea } from 'shared/ui';
import { DatePicker } from 'shared/ui/date-picker';

import { validationSchema } from '../config';

import styles from './styles.module.scss';

interface CreateTaskModalProps {
  close: VoidFunction;
  onSubmit: (values: NewTask) => void;
}

const CreateTaskModal: React.VFC<CreateTaskModalProps> = (props) => {
  const { close, onSubmit } = props;

  const { t: tActions } = useTranslation('actions');
  const { t: tTask } = useTranslation('task');

  const now = new Date();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewTask>({
    defaultValues: { start_date: now, due_date: setHours(now, now.getHours() + 1) },
    resolver: yupResolver(validationSchema),
  });

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
                  onChange={(value) => field.onChange(value)}
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
                  onChange={(value) => field.onChange(value)}
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

          <Button type="submit">{tActions('create')}</Button>
        </div>
      </form>
    </Modal>
  );
};

export const CreateTask: React.VFC = () => {
  const { t } = useTranslation('task');
  const [isModalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function createTask(values: NewTask) {
    taskModel.events.addTask({ ...values, id: Date.now() });
    closeModal();
  }

  return (
    <>
      <Button className={styles.button} onClick={openModal}>
        <PlusIcon /> <span>{t('addTask')}</span>
      </Button>

      {isModalOpen && <CreateTaskModal close={closeModal} onSubmit={createTask} />}
    </>
  );
};
