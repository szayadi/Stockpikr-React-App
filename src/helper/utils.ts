const calcPriceDifference = (firstPrice: number, secondPrice: number): number => {
  if (secondPrice === 0) return 0;
  return firstPrice / secondPrice - 1;
};

const displayPriceDiffPercentage = (priceDiff: number): string => {
  return `${(priceDiff * 100).toFixed(4).replace(/\.?0+$/, '')}%`;
};

export const calPriceDifferentPercentage = (firstPrice: number, secondPrice: number): string => {
  const priceDiff = calcPriceDifference(firstPrice, secondPrice);
  return displayPriceDiffPercentage(priceDiff);
};
