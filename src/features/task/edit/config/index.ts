import { object, string, date, boolean, SchemaOf } from 'yup';

import { NewTask } from 'shared/api';

export const validationSchema: SchemaOf<NewTask> = object({
  title: string().required(),
  description: string().required(),
  start_date: date().required(),
  due_date: date().required(),
  completed: boolean(),
});
