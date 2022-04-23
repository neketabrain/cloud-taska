export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  start_date: string;
  due_date: string;
  completed?: boolean;
}

export interface TaskRequest extends Omit<TaskResponse, 'id'> {}

export interface Task extends Omit<TaskResponse, 'start_date' | 'due_date'> {
  start_date: Date;
  due_date: Date;
}

export interface NewTask extends Omit<Task, 'id'> {}
