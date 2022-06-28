import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { taskLib, taskModel } from 'entities/task';
import { FilterIcon, ResetIcon } from 'shared/assets/icons';
import { useDebounce } from 'shared/lib';
import { Button, Input, DatePicker, Select, Modal } from 'shared/ui';

import { DEFAULT_VALUES, getStatusItems } from '../config';

import styles from './styles.module.scss';

function useFilters(withSubmitButton?: boolean) {
  const [searchParams, setSearchParams] = useSearchParams();
  const debounce = useDebounce();

  const {
    register,
    control,
    watch,
    setValue,
    reset,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<taskModel.types.TasksQueryConfig>({
    defaultValues: { ...DEFAULT_VALUES, ...taskLib.getQueryConfigFromParams(searchParams) },
  });
  const { title, completed, startDate, dueDate } = watch();

  const handleChangeStartDate = useCallback(
    (date: Date | null, onChange: (date: Date | null) => void) => {
      if (date && dueDate && date.getTime() > dueDate.getTime()) {
        const newDueDate = new Date(date);
        newDueDate.setDate(newDueDate.getDate());
        setValue('dueDate', newDueDate);
      }

      onChange(date);
    },
    [dueDate, setValue]
  );

  const handleChangeDueDate = useCallback(
    (date: Date | null, onChange: (date: Date | null) => void) => {
      if (date && startDate && date.getTime() < startDate.getTime()) {
        const newStartDate = new Date(date);
        newStartDate.setDate(newStartDate.getDate());
        setValue('startDate', newStartDate);
      }

      onChange(date);
    },
    [setValue, startDate]
  );

  const handleReset = useCallback(() => {
    reset(DEFAULT_VALUES);
    setSearchParams({});
    taskModel.events.setQueryConfig({});
  }, [reset, setSearchParams]);

  const handleSubmit = useCallback(() => {
    setSearchParams(taskLib.getSearchParamsFromConfig({ startDate, dueDate, title, completed }));
    taskModel.events.setQueryConfig({ startDate, dueDate, title, completed });
  }, [completed, dueDate, setSearchParams, startDate, title]);

  useEffect(() => {
    if (!withSubmitButton) {
      debounce(handleSubmit, 200, true);
    }
  }, [debounce, handleSubmit, withSubmitButton]);

  useEffect(() => {
    if (!searchParams.toString()) {
      reset(DEFAULT_VALUES);
    }
  }, [searchParams, reset]);

  useEffect(() => {
    return () => {
      taskModel.events.resetQueryConfig();
    };
  }, []);

  return {
    searchParams,
    form: {
      register,
      control,
      errors,
      handleChangeDueDate,
      handleChangeStartDate,
      handleSubmit: onSubmit(handleSubmit),
      handleReset,
    },
  };
}

interface FilterTasksFormProps {
  filterState: ReturnType<typeof useFilters>;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  actions?: React.ReactNode;
  inputContainerClassName?: string;
}

const FilterTasksForm: React.FC<FilterTasksFormProps> = (props) => {
  const { t } = useTranslation('filters');

  const { filterState, onSubmit, actions, inputContainerClassName } = props;
  const { control, register, errors, handleChangeStartDate, handleChangeDueDate } = filterState.form;

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={inputContainerClassName}>
        <div className={styles.input}>
          <Input label={t('title')} placeholder={t('enterValue')} type="search" {...register('title')} />
        </div>

        <div className={styles.input}>
          <Controller
            name="completed"
            control={control}
            render={({ field }) => (
              <Select
                label={t('status')}
                placeholder={t('enterValue')}
                value={field.value}
                onChange={field.onChange}
                items={getStatusItems(t)}
              />
            )}
          />
        </div>

        <div className={styles.input}>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                label={t('startDate')}
                placeholder={t('enterDate')}
                hasError={!!errors.startDate}
                selected={field.value}
                onChange={(value) => handleChangeStartDate(value, field.onChange)}
                dateFormat="P"
              />
            )}
          />
        </div>

        <div className={styles.input}>
          <Controller
            name="dueDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                label={t('dueDate')}
                placeholder={t('enterDate')}
                hasError={!!errors.dueDate}
                selected={field.value}
                onChange={(value) => handleChangeDueDate(value, field.onChange)}
                dateFormat="P"
              />
            )}
          />
        </div>
      </div>

      {actions}
    </form>
  );
};

interface FilterTasksProps {
  className?: string;
}

export const FilterTasks: React.FC<FilterTasksProps> = (props) => {
  const { className } = props;

  const { t: tActions } = useTranslation('actions');
  const { t: tFilters } = useTranslation('filters');

  const filterState = useFilters();
  const {
    searchParams,
    form: { handleReset },
  } = filterState;

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.header}>
        <h2 className={styles.title}>{tFilters('filters')}</h2>

        {!!searchParams.toString() && (
          <Button className={styles.reset} variant="transparent" onClick={handleReset}>
            <ResetIcon />
            {tActions('reset')}
          </Button>
        )}
      </div>

      <FilterTasksForm filterState={filterState} />
    </div>
  );
};

interface FilterTasksModalProps {
  className?: string;
}

export const FilterTasksModal: React.FC<FilterTasksModalProps> = (props) => {
  const { className } = props;

  const { t: tFilters } = useTranslation('filters');
  const { t: tActions } = useTranslation('actions');

  const [isModalOpen, setModalOpen] = useState(false);

  const filterState = useFilters(true);
  const { handleReset, handleSubmit } = filterState.form;

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function submitFilters(event: React.FormEvent<HTMLFormElement>) {
    handleSubmit(event);
    closeModal();
  }

  function resetFilters() {
    handleReset();
    closeModal();
  }

  return (
    <>
      <Button
        className={clsx(styles.modalButton, className)}
        variant="secondary"
        onClick={openModal}
        aria-label={tFilters('filters')}
      >
        <FilterIcon /> <span>{tFilters('filters')}</span>
      </Button>

      {isModalOpen && (
        <Modal title={tFilters('filters')} close={closeModal} withCloseButton={true}>
          <div className={styles.modal}>
            <FilterTasksForm
              filterState={filterState}
              onSubmit={submitFilters}
              inputContainerClassName={styles.modalInputs}
              actions={
                <div className={styles.modalActions}>
                  <Button variant="secondary" onClick={resetFilters}>
                    {tActions('reset')}
                  </Button>

                  <Button type="submit">{tActions('accept')}</Button>
                </div>
              }
            />
          </div>
        </Modal>
      )}
    </>
  );
};
