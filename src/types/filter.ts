export const Filters = [
  'all',
  'overdue',
  'today',
  'repeating',
  'favorites',
  'archive',
] as const;

export type Filter = (typeof Filters)[number];
