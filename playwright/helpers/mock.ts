export function getEndOfToday() {
  const date = new Date();
  date.setHours(23);
  date.setMinutes(59);
  return date;
}
