interface Task {
  id: number;
  title: string;
  description: string;
  start_date: string;
  due_date: string;
  completed?: boolean;
}

export type { Task };
