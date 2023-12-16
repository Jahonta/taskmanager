import { Task } from '@taskmanager/types';

import { sort } from './sorting';

const mockTasks = [
  {
    id: 'task-1',
    color: 'yellow',
    description: 'Task 1',
    dueDate: null,
    isArchived: false,
    isFavorite: false,
    repeatingDays: {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false,
    },
  },
  {
    id: 'task-2',
    color: 'pink',
    description: 'Task 2',
    dueDate: new Date(Date.now() + 10000).toISOString(),
    isArchived: false,
    isFavorite: false,
    repeatingDays: {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false,
    },
  },
  {
    id: 'task-3',
    color: 'black',
    description: 'Task 3',
    dueDate: '2022-12-21T21:00:04.596Z',
    isArchived: false,
    isFavorite: false,
    repeatingDays: {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false,
    },
  },
  {
    id: 'task-4',
    color: 'blue',
    description: 'Task-4',
    dueDate: '2028-12-20T21:00:04.596Z',
    isArchived: false,
    isFavorite: false,
    repeatingDays: {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false,
    },
  },
  {
    id: 'task-5',
    color: 'yellow',
    description: 'Task-5',
    dueDate: '2023-12-12T21:00:04.596Z',
    isArchived: false,
    isFavorite: false,
    repeatingDays: {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false,
    },
  },
];

describe('Helpers: sorting ', () => {
  it('sort should return tasks in the same order if the sorting is set to default', () => {
    expect(sort['DEFAULT'](mockTasks as Task[])).toEqual(mockTasks);
  });

  it('sort should return tasks sorted by due date down if the sorting is set to date down', () => {
    expect(sort['DATE_DOWN'](mockTasks as Task[])).toEqual([
      mockTasks[3],
      mockTasks[1],
      mockTasks[4],
      mockTasks[2],
      mockTasks[0],
    ]);
  });

  it('sort should return tasks sorted by due date up if the sorting is set to date up', () => {
    expect(sort['DATE_UP'](mockTasks as Task[])).toEqual([
      mockTasks[2],
      mockTasks[4],
      mockTasks[1],
      mockTasks[3],
      mockTasks[0],
    ]);
  });
});
