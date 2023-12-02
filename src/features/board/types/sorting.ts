export const SortingType = {
  DEFAULT: 'DEFAULT',
  DATE_UP: 'DATE_UP',
  DATE_DOWN: 'DATE_DOWN',
} as const;

export type Sorting = keyof typeof SortingType;
