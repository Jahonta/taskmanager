import { Color } from './color';

export type Task = {
  id: string;
  color: Color;
  description: string;
  dueDate: string;
  isArchived: boolean;
  isFavorite: boolean;
  repeatingDays: {
    mo: boolean;
    tu: boolean;
    we: boolean;
    th: boolean;
    fr: boolean;
    sa: boolean;
    su: boolean;
  };
};
