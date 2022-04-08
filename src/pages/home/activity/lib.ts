import isFriday from 'date-fns/isFriday';
import isMonday from 'date-fns/isMonday';
import isSaturday from 'date-fns/isSaturday';
import isSunday from 'date-fns/isSunday';
import isThursday from 'date-fns/isThursday';
import isTuesday from 'date-fns/isTuesday';
import isWednesday from 'date-fns/isWednesday';

import { Task } from 'shared/api/task';
import { getToday } from 'shared/lib';
import { GraphColumn } from 'shared/ui/graph';

export function getTaskStatistics(tasks: Task[]) {
  return tasks.reduce(
    (acc, task) => {
      if (task.completed) {
        acc.completed++;
      } else {
        acc.active++;
      }

      return acc;
    },
    { active: 0, completed: 0 }
  );
}

export function getGraphColumns(tasks: Task[]): GraphColumn[] {
  const tasksCount = tasks.length;
  const today = getToday().getDay();

  const count = tasks.reduce(
    (acc, task) => {
      const startDate = new Date(task.start_date);

      if (isMonday(startDate)) {
        acc.monday++;
      } else if (isTuesday(startDate)) {
        acc.tuesday++;
      } else if (isWednesday(startDate)) {
        acc.wednesday++;
      } else if (isThursday(startDate)) {
        acc.thursday++;
      } else if (isFriday(startDate)) {
        acc.friday++;
      } else if (isSaturday(startDate)) {
        acc.saturday++;
      } else if (isSunday(startDate)) {
        acc.sunday++;
      }

      return acc;
    },
    { monday: 0, tuesday: 0, wednesday: 0, thursday: 0, friday: 0, saturday: 0, sunday: 0 }
  );

  return [
    { label: 'Пн', value: (count.monday / tasksCount) * 100, active: today === 1 },
    { label: 'Вт', value: (count.tuesday / tasksCount) * 100, active: today === 2 },
    { label: 'Ср', value: (count.wednesday / tasksCount) * 100, active: today === 3 },
    { label: 'Чт', value: (count.thursday / tasksCount) * 100, active: today === 4 },
    { label: 'Пт', value: (count.friday / tasksCount) * 100, active: today === 5 },
    { label: 'Сб', value: (count.saturday / tasksCount) * 100, active: today === 6 },
    { label: 'Вс', value: (count.sunday / tasksCount) * 100, active: today === 0 },
  ];
}
