import { Color } from '@taskmanager/types';

export type ServerTask = {
  id: string;
  color: Color;
  description: string;
  due_date: string;
  is_archived: boolean;
  is_favorite: boolean;
  repeating_days: {
    mo: boolean;
    tu: boolean;
    we: boolean;
    th: boolean;
    fr: boolean;
    sa: boolean;
    su: boolean;
  };
};
