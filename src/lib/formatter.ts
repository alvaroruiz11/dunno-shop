export const dateFormatter = (date: Date) => {
  const value = new Date(date);
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(value);
};
export const currencyFormatter = (value: number) => {
  return value.toLocaleString('es-BO', {
    style: 'currency',
    currency: 'BOB',
    minimumFractionDigits: 2,
  });
};
