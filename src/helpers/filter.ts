import { Filter, Task } from '@taskmanager/types';

import { isToday, isRepeating, isOverdue } from './task';

export function getFilteredTasks(tasks: Task[]): Record<Filter, Task[]> {
  return {
    all: tasks,
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
