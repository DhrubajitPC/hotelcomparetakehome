import { Hotel, Price } from "../../state/types";

export const orderHotelsbyPriceAvailability = (
  hotels: Hotel[],
  prices: Price[]
) => {
  const hotelsWithPrices = hotels.filter((h) =>
    Boolean(prices.find((p) => p.id === h.id)?.price)
  );
  const hotelsWithoutPrices = hotels.filter(
    (h) => !Boolean(prices.find((p) => p.id === h.id)?.price)
  );

  return [...hotelsWithPrices, ...hotelsWithoutPrices];
};
