import { Filter, Task } from '@taskmanager/types';

import { isToday, isRepeating, isOverdue } from './task';

function getFilteredTasks(tasks: Task[]): Record<Filter, Task[]> {
  return {
    all: tasks.filter((task) => !task.isArchived),
    overdue: tasks.filter(
      (task) => !task.isArchived && isOverdue(task.dueDate)
    ),
    today: tasks.filter((task) => !task.isArchived && isToday(task.dueDate)),
    repeating: tasks.filter(
      (task) => !task.isArchived && isRepeating(task.repeatingDays)
    ),
    favorites: tasks.filter((task) => !task.isArchived && task.isFavorite),
    archive: tasks.filter((task) => task.isArchived),
  };
}

export function getFilters(tasks: Task[]): [Filter, number][] {
  return (Object.entries(getFilteredTasks(tasks)) as [Filter, Task[]][]).map(
    ([name, tasks]) => [name, tasks.length]
  );
}

export function getTasksByFilter(filter: Filter, tasks: Task[] = []) {
  return getFilteredTasks(tasks)[filter];
}
