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
