import { formatCardDate } from './format';

describe('Helpers: format ', () => {
  it('formatCardDate should return empty string if dueDate is null', () => {
    expect(formatCardDate(null)).toBe('');
  });

  it('formatCardDate should return formatted date', () => {
    expect(formatCardDate('2022-01-01T00:00:00.000Z')).toBe('1 January');
  });
});
