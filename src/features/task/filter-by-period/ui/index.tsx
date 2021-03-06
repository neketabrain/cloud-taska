import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { taskModel } from 'entities/task';
import { TextSwitch } from 'shared/ui';

import { getFilters } from '../config';

function useFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const period = useMemo(
    () =>
      (searchParams.get('period') as taskModel.types.TasksQueryPeriods) || taskModel.types.TasksQueryPeriods.tomorrow,
    [searchParams]
  );

  const changeFilter = useCallback(
    (newPeriod: taskModel.types.TasksQueryPeriods | string) => {
      setSearchParams({ period: newPeriod });
    },
    [setSearchParams]
  );

  useEffect(() => {
    if (Object.values(taskModel.types.TasksQueryPeriods).includes(period)) {
      taskModel.events.setQueryConfig({ period });
    } else {
      setSearchParams({ period: taskModel.types.TasksQueryPeriods.tomorrow });
    }
  }, [period, setSearchParams]);

  useEffect(() => {
    return () => {
      taskModel.events.resetQueryConfig();
    };
  }, []);

  return { period, changeFilter };
}

interface FilterTasksByPeriodProps {
  allTasksLink: string;
  className?: string;
}

export const FilterTasksByPeriod: React.FC<FilterTasksByPeriodProps> = (props) => {
  const { allTasksLink, className } = props;

  const { t } = useTranslation('datetime');
  const { changeFilter, period } = useFilter();

  return (
    <TextSwitch
      name="period"
      items={getFilters(t, allTasksLink)}
      value={period}
      onChange={changeFilter}
      className={className}
    />
  );
};
