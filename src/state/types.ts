export type Hotel = {
  id: number;
  name: string;
  rating: number;
  stars: number;
  address: string;
  photo: string;
  description: string;
};

export type Price = {
  id: number;
  price: number;
  competors?: Record<string, number>;
  taxes_and_fees?: Record<string, number>;
};

export type Currency = "USD" | "SGD" | "CNY" | "KRW";

type LoadingState = "REQUEST" | "FAILURE" | "SUCCESS";

export type State = {
  hotels: Array<Hotel>;
  prices: Record<Currency, Array<Price>>;
  selectedCurrency: Currency;
  loading: {
    hotels: LoadingState;
    prices: LoadingState;
  };
};
