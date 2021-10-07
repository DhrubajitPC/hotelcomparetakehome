import { useComparisons } from "../../hooks";
import { useAppContext } from "../../state/Context";

export const usePriceBreakdown = (hotelId: number) => {
  const {
    state: { prices },
  } = useAppContext();
  const price = prices.find((p) => p.id === hotelId);
  return {
    totalPrice: price?.price ?? "Rates Unavailable",
    tax: price?.taxes_and_fees?.tax,
    hotelFees: price?.taxes_and_fees?.hotel_fees,
  };
};

export const useSavings = (hotelId: number) => {
  const comparisons = useComparisons(hotelId);

  if (comparisons.length === 0) return null;

  if (comparisons[comparisons.length - 1].name === "Us") return null;

  const ourPrice = comparisons.find((c) => c.name === "Us")?.price;
  if (!ourPrice) return null;

  const maxPrice = comparisons[comparisons.length - 1].price;

  return ((maxPrice - ourPrice) / maxPrice) * 100;
};
