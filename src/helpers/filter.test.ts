import { Task } from '@taskmanager/types';

import { getFilters, getTasksByFilter } from './filter';

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
    color: 'black',
    description: 'Task 2',
    dueDate: '2023-12-15T21:00:04.596Z',
    isArchived: true,
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
    color: 'green',
    description: 'Task 3',
    dueDate: null,
    isArchived: false,
    isFavorite: true,
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
    color: 'pink',
    description: 'Task 4',
    dueDate: null,
    isArchived: false,
    isFavorite: false,
    repeatingDays: {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: true,
      sa: false,
      su: false,
    },
  },
  {
    id: 'task-5',
    color: 'pink',
    description: 'Task 5',
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
    id: 'task-6',
    color: 'black',
    description: 'Task 6',
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
    id: 'task-7',
    color: 'blue',
    description: 'Task-7',
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
    id: 'task-8',
    color: 'yellow',
    description: 'Task-8',
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
  {
    id: 'task-9',
    color: 'pink',
    description: 'Task 9',
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
      su: true,
    },
  },
  {
    id: 'task-10',
    color: 'blue',
    description: 'Task 10',
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
];

describe('Helpers: filter', () => {
  it('getFilters should return correct filters', () => {
    const result = getFilters(mockTasks as Task[]);
    expect(result).toEqual([
      ['all', 9],
      ['overdue', 2],
      ['today', 1],
      ['repeating', 2],
      ['favorites', 1],
      ['archive', 1],
    ]);
  });

  it('getTasksByFilter should return correct tasks if filter is "all"', () => {
    const result = getTasksByFilter('all', mockTasks as Task[]);
    expect(result).toEqual(mockTasks.filter((_, i) => i !== 1));
  });

  it('getTasksByFilter should return correct tasks if filter is "overdue"', () => {
    const result = getTasksByFilter('overdue', mockTasks as Task[]);
    expect(result).toEqual([mockTasks[5], mockTasks[7]]);
  });

  it('getTasksByFilter should return correct tasks if filter is "today"', () => {
    const result = getTasksByFilter('today', mockTasks as Task[]);
    expect(result).toEqual([mockTasks[4]]);
  });

  it('getTasksByFilter should return correct tasks if filter is "repeating"', () => {
    const result = getTasksByFilter('repeating', mockTasks as Task[]);
    expect(result).toEqual([mockTasks[3], mockTasks[8]]);
  });

  it('getTasksByFilter should return correct tasks if filter is "favorites"', () => {
    const result = getTasksByFilter('favorites', mockTasks as Task[]);
    expect(result).toEqual([mockTasks[2]]);
  });

  it('getTasksByFilter should return correct tasks if filter is "archive"', () => {
    const result = getTasksByFilter('archive', mockTasks as Task[]);
    expect(result).toEqual([mockTasks[1]]);
  });
});
