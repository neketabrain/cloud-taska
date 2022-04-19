import * as Delete from './delete';
import * as Edit from './edit';
import * as Toggle from './toggle';

export const Task = {
  ...Delete,
  ...Edit,
  ...Toggle,
};
