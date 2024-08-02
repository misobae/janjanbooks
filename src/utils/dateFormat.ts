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
};

export function getCurrentDateInfo() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  
  return { currentYear, currentMonth };
};