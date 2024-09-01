export const formatPrice = (value: number): string => {
  // Convertimos el número a una cadena y usamos una expresión regular para formatearlo
  const formattedValue = value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Agregamos el símbolo de peso y el punto final
  return `$ ${formattedValue}.-`;
};
