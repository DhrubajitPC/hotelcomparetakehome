import { Currency, Price, State } from "../state/types";
import {
  HOTELS_URL,
  PRICE_CNY_URL,
  PRICE_KRW_URL,
  PRICE_SGD_URL,
  PRICE_USD_URL,
} from "./urls";
import * as A from "../state/actions";

function fetchAdapter<T>(url: string): Promise<T> {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<T>;
  });
}

export const apiWrapper = (
  dispatch: React.Dispatch<{
    type: string;
    payload: any;
  }>
) => {
  return {
    fetchPrices: async (currency: Currency) => {
      dispatch({
        type: A.FETCH_PRICE_REQUEST,
        payload: "",
      });

      try {
        let url = "";
        switch (currency) {
          case "CNY":
            url = PRICE_CNY_URL;
            break;
          case "KRW":
            url = PRICE_KRW_URL;
            break;
          case "SGD":
            url = PRICE_SGD_URL;
            break;
          case "USD":
            url = PRICE_USD_URL;
            break;
        }
        const price_data = await fetchAdapter<State["prices"]["USD"]>(url);

        dispatch({
          type: A.FETCH_PRICE_SUCCESS,
          payload: { currency: currency, data: price_data } as {
            currency: Currency;
            data: Price[];
          },
        });
      } catch (e) {
        dispatch({
          type: A.FETCH_PRICE_FAILURE,
          payload: e,
        });
      }
    },

    fetchHotels: async () => {
      dispatch({
        type: A.FETCH_HOTELS_REQUEST,
        payload: "",
      });

      try {
        const hotels_data = await fetchAdapter<State["hotels"]>(HOTELS_URL);

        dispatch({
          type: A.FETCH_HOTELS_SUCCESS,
          payload: hotels_data,
        });
      } catch (e) {
        dispatch({
          type: A.FETCH_HOTELS_FAILURE,
          payload: e,
        });
      }
    },
  };
};

export default fetchAdapter;
