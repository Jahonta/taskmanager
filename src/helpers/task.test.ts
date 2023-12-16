import { isOverdue, isRepeating, isToday } from './task';

describe('Helpers: task', () => {
  it('isOverdue should return true when dueDate is in the past', () => {
    const dueDate = new Date(Date.now() - 1000);
    const result = isOverdue(dueDate.toISOString());
    expect(result).toBe(true);
  });

  it('isOverdue should return false when dueDate is in the future', () => {
    const dueDate = new Date(Date.now() + 1000);
    const result = isOverdue(dueDate.toISOString());
    expect(result).toBe(false);
  });

  it('isOverdue should return false when dueDate is exactly now', () => {
    const result = isOverdue(new Date().toISOString());
    expect(result).toBe(false);
  });

  it('isRepeating should return true when at least one day is set to repeat', () => {
    const repeatingDays = {
      mo: false,
      tu: true,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false,
    };

    const result = isRepeating(repeatingDays);

    expect(result).toBe(true);
  });

  it('isRepeating should return false when no days are set to repeat', () => {
    const repeatingDays = {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false,
    };

    const result = isRepeating(repeatingDays);

    expect(result).toBe(false);
  });

  it('isToday should return true when the due date is today', () => {
    const result = isToday(new Date().toISOString());
    expect(result).toBe(true);
  });

  it('isToday should return false when the due date is in the future', () => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 1);
    const result = isToday(dueDate.toISOString());
    expect(result).toBe(false);
  });

  it('isToday should return false when the due date is in the past', () => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() - 1);
    const result = isToday(dueDate.toISOString());
    expect(result).toBe(false);
  });

  it('isToday should return false when the due date is on a different year', () => {
    const dueDate = new Date();
    dueDate.setFullYear(dueDate.getFullYear() + 1);
    const result = isToday(dueDate.toISOString());
    expect(result).toBe(false);
  });

  it('isToday should return false when the due date is null', () => {
    const result = isToday(null);
    expect(result).toBe(false);
  });
});
