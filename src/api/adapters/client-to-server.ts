import { Task } from '@taskmanager/types';

import { ServerTask } from '../types/server-task';

function adaptToServer(task: Task | Omit<Task, 'id'>): Omit<ServerTask, 'id'> {
  return {
    color: task.color,
    description: task.description,
    due_date: task.dueDate,
    is_archived: task.isArchived,
    is_favorite: task.isFavorite,
    repeating_days: task.repeatingDays,
  };
}

export { adaptToServer };
