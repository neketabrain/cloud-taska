import { isMonday, isTuesday, isWednesday, isThursday, isFriday, isSaturday, isSunday } from 'date-fns';

import { Task } from 'shared/api/task';
import { getToday } from 'shared/lib';
import { BarChartItem } from 'shared/ui';

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

function getTooltipText(allTasks: number, completedTasks: number): string {
  return `Завершено: ${completedTasks}\nОсталось: ${allTasks - completedTasks}\nВсего: ${allTasks}`;
}

export function getChartData(tasks: Task[]): BarChartItem[] {
  const today = getToday().getDay();

  const tasksByDay = tasks.reduce(
    (acc, task) => {
      const startDate = new Date(task.start_date);

      if (isMonday(startDate)) {
        acc.mondayAll++;

        if (task.completed) {
          acc.mondayCompleted++;
        }
      } else if (isTuesday(startDate)) {
        acc.tuesdayAll++;

        if (task.completed) {
          acc.tuesdayCompleted++;
        }
      } else if (isWednesday(startDate)) {
        acc.wednesdayAll++;

        if (task.completed) {
          acc.wednesdayCompleted++;
        }
      } else if (isThursday(startDate)) {
        acc.thursdayAll++;

        if (task.completed) {
          acc.thursdayCompleted++;
        }
      } else if (isFriday(startDate)) {
        acc.fridayAll++;

        if (task.completed) {
          acc.fridayCompleted++;
        }
      } else if (isSaturday(startDate)) {
        acc.saturdayAll++;

        if (task.completed) {
          acc.saturdayCompleted++;
        }
      } else if (isSunday(startDate)) {
        acc.sundayAll++;

        if (task.completed) {
          acc.sundayCompleted++;
        }
      }

      return acc;
    },
    {
      mondayAll: 0,
      mondayCompleted: 0,
      tuesdayAll: 0,
      tuesdayCompleted: 0,
      wednesdayAll: 0,
      wednesdayCompleted: 0,
      thursdayAll: 0,
      thursdayCompleted: 0,
      fridayAll: 0,
      fridayCompleted: 0,
      saturdayAll: 0,
      saturdayCompleted: 0,
      sundayAll: 0,
      sundayCompleted: 0,
    }
  );

  const maxTaskCount = Math.max(
    tasksByDay.mondayAll,
    tasksByDay.tuesdayAll,
    tasksByDay.wednesdayAll,
    tasksByDay.thursdayAll,
    tasksByDay.fridayAll,
    tasksByDay.saturdayAll,
    tasksByDay.sundayAll
  );

  return [
    {
      label: 'Пн',
      foregroundValue: (tasksByDay.mondayAll / maxTaskCount) * 100,
      value: (tasksByDay.mondayCompleted / maxTaskCount) * 100,
      active: today === 1,
      tooltip: getTooltipText(tasksByDay.mondayAll, tasksByDay.mondayCompleted),
    },
    {
      label: 'Вт',
      foregroundValue: (tasksByDay.tuesdayAll / maxTaskCount) * 100,
      value: (tasksByDay.tuesdayCompleted / maxTaskCount) * 100,
      active: today === 2,
      tooltip: getTooltipText(tasksByDay.tuesdayAll, tasksByDay.tuesdayCompleted),
    },
    {
      label: 'Ср',
      foregroundValue: (tasksByDay.wednesdayAll / maxTaskCount) * 100,
      value: (tasksByDay.wednesdayCompleted / maxTaskCount) * 100,
      active: today === 3,
      tooltip: getTooltipText(tasksByDay.wednesdayAll, tasksByDay.wednesdayCompleted),
    },
    {
      label: 'Чт',
      foregroundValue: (tasksByDay.thursdayAll / maxTaskCount) * 100,
      value: (tasksByDay.thursdayCompleted / maxTaskCount) * 100,
      active: today === 4,
      tooltip: getTooltipText(tasksByDay.thursdayAll, tasksByDay.thursdayCompleted),
    },
    {
      label: 'Пт',
      foregroundValue: (tasksByDay.fridayAll / maxTaskCount) * 100,
      value: (tasksByDay.fridayCompleted / maxTaskCount) * 100,
      active: today === 5,
      tooltip: getTooltipText(tasksByDay.fridayAll, tasksByDay.fridayCompleted),
    },
    {
      label: 'Сб',
      foregroundValue: (tasksByDay.saturdayAll / maxTaskCount) * 100,
      value: (tasksByDay.saturdayCompleted / maxTaskCount) * 100,
      active: today === 6,
      tooltip: getTooltipText(tasksByDay.saturdayAll, tasksByDay.saturdayCompleted),
    },
    {
      label: 'Вс',
      foregroundValue: (tasksByDay.sundayAll / maxTaskCount) * 100,
      value: (tasksByDay.sundayCompleted / maxTaskCount) * 100,
      active: today === 0,
      tooltip: getTooltipText(tasksByDay.sundayAll, tasksByDay.sundayCompleted),
    },
  ];
}
