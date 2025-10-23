export const emailPattern = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: 'El valor ingresado no luce como un correo electrónico',
};

export const slugPattern = {
  value: /^[a-z0-9_]+(?:-[a-z0-9_]+)*$/,
  message: 'El slug no puede contener espacios en blanco',
};
