export type Hotel = {
  id: number;
  name: string;
  rating: number;
  stars: number;
  address: string;
  photo: string;
  description: string;
};

export type Currency = {
  id: number;
  price: number;
  competors?: Record<string, number>;
  taxes_and_fees?: Record<string, number>;
};

export type State = {
  hotels: Array<
    Hotel & {
      price?: Record<string, Currency>;
    }
  >;
  selectedCurrency: "USD" | "SGD" | "CNY" | "KRW";
  loading: {
    hotel: boolean;
    pricing: boolean;
  };
};
