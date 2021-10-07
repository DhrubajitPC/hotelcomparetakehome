import { formatPrice } from "../utils";
import { useAppContext } from "../state/Context";

export const useComparisons = (hotelId: number) => {
  const {
    state: { prices, selectedCurrency },
  } = useAppContext();

  const hotelPrice = prices.find((p) => p.id === hotelId);
  if (!hotelPrice?.competitors) return [];

  const ourPrice = hotelPrice.price;
  const comparisons = Object.entries(hotelPrice.competitors).map((c) => ({
    name: c[0],
    price: formatPrice(selectedCurrency, c[1]),
    currency: selectedCurrency,
  }));

  if (ourPrice) {
    comparisons.push({
      name: "Us",
      price: formatPrice(selectedCurrency, ourPrice),
      currency: selectedCurrency,
    });
  }

  return comparisons.sort((a, b) => a.price - b.price);

};
