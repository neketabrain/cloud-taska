import * as Create from './create';
import * as Delete from './delete';
import * as Edit from './edit';
import * as Filter from './filter';
import * as FilterByPeriod from './filter-by-period';
import * as Toggle from './toggle';

export const Task = {
  ...Create,
  ...Delete,
  ...Edit,
  ...Filter,
  ...FilterByPeriod,
  ...Toggle,
};
