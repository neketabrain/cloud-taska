import { isMonday, isTuesday, isWednesday, isThursday, isFriday, isSaturday, isSunday } from 'date-fns';
import { TFunction } from 'react-i18next';

import { TaskNormalized } from 'shared/api';
import { getToday } from 'shared/lib';
import { BarChartItem } from 'shared/ui';

export function getTaskStatistics(tasks: TaskNormalized[]) {
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

function getTooltipText(allTasks: number, completedTasks: number, t: TFunction): string {
  return `${t('completed')}: ${completedTasks}\n${t('left')}: ${allTasks - completedTasks}\n${t('total')}: ${allTasks}`;
}

export function getChartData(tasks: TaskNormalized[], tDatetime: TFunction, tActivity: TFunction): BarChartItem[] {
  const today = getToday().getDay();

  const tasksByDay = tasks.reduce(
    (acc, task) => {
      if (isMonday(task.start_date)) {
        acc.mondayAll++;

        if (task.completed) {
          acc.mondayCompleted++;
        }
      } else if (isTuesday(task.start_date)) {
        acc.tuesdayAll++;

        if (task.completed) {
          acc.tuesdayCompleted++;
        }
      } else if (isWednesday(task.start_date)) {
        acc.wednesdayAll++;

        if (task.completed) {
          acc.wednesdayCompleted++;
        }
      } else if (isThursday(task.start_date)) {
        acc.thursdayAll++;

        if (task.completed) {
          acc.thursdayCompleted++;
        }
      } else if (isFriday(task.start_date)) {
        acc.fridayAll++;

        if (task.completed) {
          acc.fridayCompleted++;
        }
      } else if (isSaturday(task.start_date)) {
        acc.saturdayAll++;

        if (task.completed) {
          acc.saturdayCompleted++;
        }
      } else if (isSunday(task.start_date)) {
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
      label: tDatetime('shortWeekDays.monday'),
      foregroundValue: (tasksByDay.mondayAll / maxTaskCount) * 100,
      value: (tasksByDay.mondayCompleted / maxTaskCount) * 100,
      active: today === 1,
      tooltip: getTooltipText(tasksByDay.mondayAll, tasksByDay.mondayCompleted, tActivity),
    },
    {
      label: tDatetime('shortWeekDays.tuesday'),
      foregroundValue: (tasksByDay.tuesdayAll / maxTaskCount) * 100,
      value: (tasksByDay.tuesdayCompleted / maxTaskCount) * 100,
      active: today === 2,
      tooltip: getTooltipText(tasksByDay.tuesdayAll, tasksByDay.tuesdayCompleted, tActivity),
    },
    {
      label: tDatetime('shortWeekDays.wednesday'),
      foregroundValue: (tasksByDay.wednesdayAll / maxTaskCount) * 100,
      value: (tasksByDay.wednesdayCompleted / maxTaskCount) * 100,
      active: today === 3,
      tooltip: getTooltipText(tasksByDay.wednesdayAll, tasksByDay.wednesdayCompleted, tActivity),
    },
    {
      label: tDatetime('shortWeekDays.thursday'),
      foregroundValue: (tasksByDay.thursdayAll / maxTaskCount) * 100,
      value: (tasksByDay.thursdayCompleted / maxTaskCount) * 100,
      active: today === 4,
      tooltip: getTooltipText(tasksByDay.thursdayAll, tasksByDay.thursdayCompleted, tActivity),
    },
    {
      label: tDatetime('shortWeekDays.friday'),
      foregroundValue: (tasksByDay.fridayAll / maxTaskCount) * 100,
      value: (tasksByDay.fridayCompleted / maxTaskCount) * 100,
      active: today === 5,
      tooltip: getTooltipText(tasksByDay.fridayAll, tasksByDay.fridayCompleted, tActivity),
    },
    {
      label: tDatetime('shortWeekDays.saturday'),
      foregroundValue: (tasksByDay.saturdayAll / maxTaskCount) * 100,
      value: (tasksByDay.saturdayCompleted / maxTaskCount) * 100,
      active: today === 6,
      tooltip: getTooltipText(tasksByDay.saturdayAll, tasksByDay.saturdayCompleted, tActivity),
    },
    {
      label: tDatetime('shortWeekDays.sunday'),
      foregroundValue: (tasksByDay.sundayAll / maxTaskCount) * 100,
      value: (tasksByDay.sundayCompleted / maxTaskCount) * 100,
      active: today === 0,
      tooltip: getTooltipText(tasksByDay.sundayAll, tasksByDay.sundayCompleted, tActivity),
    },
  ];
}
