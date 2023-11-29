import { RepeatingDays, Task } from '@taskmanager/types';

export function isOverdue(dueDate: Task['dueDate']) {
  return dueDate && new Date(dueDate).getTime() < new Date().getTime();
}

export function isRepeating(repeatingDays: Task['repeatingDays']) {
  return Object.values(repeatingDays).some(Boolean);
}

export function getEmptyRepeatingDays() {
  return RepeatingDays.reduce<Task['repeatingDays']>((acc, curr) => {
    acc[curr] = false;
    return acc;
  }, {});
}
