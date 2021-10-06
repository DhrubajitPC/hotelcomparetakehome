import { Reducer } from "react";
import * as A from "./actions";
import { Currency, State } from "./types";

export const reducer: Reducer<State, { type: string; payload: any }> = (
  draft,
  action
) => {
  switch (action.type) {
    case A.REPLACE:
      return action.payload;

    case A.FETCH_HOTELS_SUCCESS:
      draft.loading.hotels = "SUCCESS";
      draft.hotels = action.payload;
      return;
    case A.FETCH_HOTELS_FAILURE:
      draft.loading.hotels = "FAILURE";
      return;
    case A.FETCH_HOTELS_REQUEST:
      draft.loading.hotels = "REQUEST";
      return;

    case A.FETCH_PRICE_SUCCESS:
      draft.loading.prices = "SUCCESS";
      const { currency, data } = action.payload;
      draft.prices[currency as Currency] = data;
      draft.selectedCurrency = currency;
      return;
    case A.FETCH_PRICE_FAILURE:
      draft.loading.prices = "FAILURE";
      return;
    case A.FETCH_PRICE_REQUEST:
      draft.loading.prices = "REQUEST";
      return;
  }
};
