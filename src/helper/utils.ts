const calcPriceDifference = (firstPrice: number, secondPrice: number): number => {
  if (secondPrice === 0) return 0;
  return firstPrice / secondPrice - 1;
};

const displayPriceDiffPercentage = (priceDiff: number): number => {
  return Number((priceDiff * 100).toFixed(4).replace(/\.?0+$/, ''));
};

export const calPriceDifferentPercentage = (firstPrice: number, secondPrice: number): number => {
  const priceDiff = calcPriceDifference(firstPrice, secondPrice);
  return displayPriceDiffPercentage(priceDiff);
};
