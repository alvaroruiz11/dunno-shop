export const dateFormatter = (date: Date) => {
  const value = new Date(date);
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(value);
};

export const dateTimeFormatter = (date: Date) => {
  const value = new Date(date);
  const dateStr = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(value);
  
  const timeStr = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(value);
  
  return `${dateStr} at ${timeStr}`;
};

export const currencyFormatter = (value: number) => {
  return value.toLocaleString('es-BO', {
    style: 'currency',
    currency: 'BOB',
    minimumFractionDigits: 2,
  });
};
