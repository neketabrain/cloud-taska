export interface Task {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  start_date: string;
  due_date: string;
  completed?: boolean;
}

export interface NewTask extends Omit<Task, 'id' | 'owner_id'> {}

export interface TaskNormalized extends Omit<Task, 'start_date' | 'due_date'> {
  start_date: Date;
  due_date: Date;
}

export interface NewTaskNormalized extends Omit<TaskNormalized, 'id' | 'owner_id'> {}
