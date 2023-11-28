import { Task } from '@taskmanager/types';

import { ServerTask } from '../types/server-task';

function adaptToClient(task: ServerTask): Task {
  return {
    id: task.id,
    color: task.color,
    description: task.description,
    dueDate: task.due_date,
    isArchived: task.is_archived,
    isFavorite: task.is_favorite,
    repeatingDays: task.repeating_days,
  };
}

export { adaptToClient };
