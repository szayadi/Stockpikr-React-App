export const numberFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

export const percentageFormatter = (value: number) => {
  return value.toFixed(2) + '%';
};
