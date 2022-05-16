import clsx from 'clsx';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { taskLib, taskModel } from 'entities/task';
import { ResetIcon } from 'shared/assets/icons';
import { useDebounce } from 'shared/lib';
import { Button, Input, DatePicker, Select } from 'shared/ui';

import { DEFAULT_VALUES, getStatusItems } from '../config';

import styles from './styles.module.scss';

interface TaskFiltersProps {
  className?: string;
}

export const TaskFilters: React.VFC<TaskFiltersProps> = (props) => {
  const { className } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  const debounce = useDebounce();

  const { t: tActions } = useTranslation('actions');
  const { t: tFilters } = useTranslation('filters');

  const {
    register,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<taskModel.types.TasksQueryConfig>({
    defaultValues: { ...DEFAULT_VALUES, ...taskLib.getQueryConfigFromParams(searchParams) },
  });
  const { title, completed, startDate, dueDate } = watch();

  function handleChangeStartDate(date: Date | null, onChange: (date: Date | null) => void) {
    if (date && dueDate && date.getTime() > dueDate.getTime()) {
      const newDueDate = new Date(date);
      newDueDate.setDate(newDueDate.getDate());
      setValue('dueDate', newDueDate);
    }

    onChange(date);
  }

  function handleChangeDueDate(date: Date | null, onChange: (date: Date | null) => void) {
    if (date && startDate && date.getTime() < startDate.getTime()) {
      const newStartDate = new Date(date);
      newStartDate.setDate(newStartDate.getDate());
      setValue('startDate', newStartDate);
    }

    onChange(date);
  }

  function handleReset() {
    reset(DEFAULT_VALUES);
  }

  useEffect(() => {
    debounce(
      () => {
        setSearchParams(taskLib.getSearchParamsFromConfig({ startDate, dueDate, title, completed }));
        taskModel.events.setQueryConfig({ startDate, dueDate, title, completed });
      },
      200,
      true
    );
  }, [debounce, setSearchParams, title, startDate, dueDate, completed]);

  return (
    <form className={clsx(styles.container, className)}>
      <div className={styles.header}>
        <h2 className={styles.title}>{tFilters('filters')}</h2>

        {!!searchParams.toString() && (
          <Button className={styles.reset} variant="transparent" onClick={handleReset}>
            <ResetIcon />
            {tActions('reset')}
          </Button>
        )}
      </div>

      <div className={styles.input}>
        <Input label={tFilters('title')} placeholder={tFilters('enterValue')} type="search" {...register('title')} />
      </div>

      <div className={styles.input}>
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              label={tFilters('startDate')}
              placeholder={tFilters('enterDate')}
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
              label={tFilters('dueDate')}
              placeholder={tFilters('enterDate')}
              hasError={!!errors.dueDate}
              selected={field.value}
              onChange={(value) => handleChangeDueDate(value, field.onChange)}
              dateFormat="P"
            />
          )}
        />
      </div>

      <div className={styles.input}>
        <Controller
          name="completed"
          control={control}
          render={({ field }) => (
            <Select
              label={tFilters('status')}
              placeholder={tFilters('enterValue')}
              value={field.value}
              onChange={field.onChange}
              items={getStatusItems(tFilters)}
            />
          )}
        />
      </div>
    </form>
  );
};
