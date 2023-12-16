import { Task } from '@taskmanager/types';

export function isOverdue(dueDate: Task['dueDate']) {
  return dueDate && new Date(dueDate).getTime() < new Date().getTime();
}

export function isRepeating(repeatingDays: Task['repeatingDays']) {
  return Object.values(repeatingDays).some(Boolean);
}

export function isToday(dueDate: Task['dueDate']) {
  if (!dueDate) {
    return false;
  }

  const taskDate = new Date(dueDate);
  const today = new Date();
  return (
    taskDate.getDate() === today.getDate() &&
    taskDate.getMonth() === today.getMonth() &&
    taskDate.getFullYear() === today.getFullYear()
  );
}
