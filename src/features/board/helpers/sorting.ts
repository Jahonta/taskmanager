import { Task } from '@taskmanager/types';

import { SortingType } from '../types/sorting';

const getNullDateSorting = (a: Task, b: Task) => {
  if (a.dueDate) {
    return -1;
  }

  if (b.dueDate) {
    return 1;
  }

  return 0;
};

export const sort = {
  [SortingType.DEFAULT]: (tasks: Task[]) => [...tasks],
  [SortingType.DATE_DOWN]: (tasks: Task[]) => {
    return tasks.slice().sort((a, b) => {
      if (a.dueDate && b.dueDate) {
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      }

      return getNullDateSorting(a, b);
    });
  },
  [SortingType.DATE_UP]: (tasks: Task[]) => {
    return tasks.slice().sort((a, b) => {
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }

      return getNullDateSorting(a, b);
    });
  },
};
