import { RepeatingDay } from './repeating-days';
import { Color } from './color';

export type Task = {
  id: string;
  color: Color;
  description: string;
  dueDate: string | null;
  isArchived: boolean;
  isFavorite: boolean;
  repeatingDays: Record<RepeatingDay, boolean>;
};
