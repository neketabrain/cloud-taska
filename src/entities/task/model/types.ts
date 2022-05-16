export enum TasksQueryPeriods {
  yesterday = 'yesterday',
  today = 'today',
  tomorrow = 'tomorrow',
  week = 'week',
}

export enum TasksQueryCompletedStatuses {
  all = 'all',
  completed = 'true',
  notCompleted = 'false',
}
export interface TasksQueryConfig {
  title?: string;
  completed?: TasksQueryCompletedStatuses;
  startDate?: Date | null;
  dueDate?: Date | null;
  period?: TasksQueryPeriods;
}
