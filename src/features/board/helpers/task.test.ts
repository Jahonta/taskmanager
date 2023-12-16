import { getEmptyRepeatingDays, getEmptyTask } from './task';

describe('Helpers: task', () => {
  it('getEmptyRepeatingDays should return empty repeating days', () => {
    expect(getEmptyRepeatingDays()).toEqual({
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false,
    });
  });

  it('getEmptyTask should return empty task', () => {
    expect(getEmptyTask()).toEqual({
      id: '',
      color: 'black',
      description: '',
      dueDate: null,
      isArchived: false,
      isFavorite: false,
      repeatingDays: getEmptyRepeatingDays(),
    });
  });
});
