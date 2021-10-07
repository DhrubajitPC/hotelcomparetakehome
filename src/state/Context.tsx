import React, { FC, useContext, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { apiWrapper } from "../infra/api";
import { browserStore } from "../infra/browserStore";
import { reducer } from "./reducers";
import { Currency, State } from "./types";

type Context = {
  state: State;
  dispatch: React.Dispatch<{
    type: string;
    payload: any;
  }>;
};

const initialCurrency = browserStore.getItem<Currency>("currency") ?? "USD";

const initialState: Context = {
  state: {
    hotels: [],
    prices: [],
    loading: { hotels: "REQUEST", prices: "REQUEST" },
    selectedCurrency: initialCurrency
  },
  dispatch: () => {},
};

const AppContext = React.createContext<Context>(initialState);

export const useAppContext = () => useContext(AppContext);

export const useAPI = () => {
  const { dispatch } = useContext(AppContext);
  return apiWrapper(dispatch);
};

const AppContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState.state);
  const api = apiWrapper(dispatch);

  // fetch initial list of hotels and usd currency
  useEffect(() => {
    function fetchInitData() {
      api.fetchHotels();
      api.fetchPrices(initialCurrency);
    }
    fetchInitData();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
