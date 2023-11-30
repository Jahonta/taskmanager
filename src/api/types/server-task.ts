import { Color, RepeatingDay } from '@taskmanager/types';

export type ServerTask = {
  id: string;
  color: Color;
  description: string;
  due_date: string | null;
  is_archived: boolean;
  is_favorite: boolean;
  repeating_days: Record<RepeatingDay, boolean>;
};
