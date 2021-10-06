import { Currency } from "../../state/types";

export const formatPrice = (currency: Currency, value: number) => {
  switch (currency) {
    case "USD":
    case "SGD":
    case "CNY":
      return Number(value.toFixed());
    case "KRW":
      return Number((value / 100).toFixed()) * 100;
  }
};
