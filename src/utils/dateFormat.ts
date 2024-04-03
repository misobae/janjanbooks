export function formatDate(date: Date) {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const formattedDate =
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    date.getDate().toString().padStart(2, '0');

  return formattedDate;
}