import { Task } from '@taskmanager/types';

export function formatCardDate(dueDate: Task['dueDate']) {
  if (!dueDate) {
    return '';
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
  }).format(new Date(dueDate));
}
