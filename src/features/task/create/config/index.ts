import { object, string, date, SchemaOf, boolean } from 'yup';

import { NewTaskNormalized } from 'shared/api';

export const validationSchema: SchemaOf<NewTaskNormalized> = object({
  title: string().required(),
  description: string().required(),
  start_date: date().required(),
  due_date: date().required(),
  completed: boolean(),
});
