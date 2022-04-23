import * as Create from './create';
import * as Delete from './delete';
import * as Edit from './edit';
import * as Toggle from './toggle';

export const Task = {
  ...Create,
  ...Delete,
  ...Edit,
  ...Toggle,
};
