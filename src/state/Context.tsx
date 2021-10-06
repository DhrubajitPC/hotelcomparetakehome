import React, { FC, useContext, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { apiWrapper } from "../infra/api";
import { reducer } from "./reducers";
import { State } from "./types";

type Context = {
  state: State;
  dispatch: React.Dispatch<{
    type: string;
    payload: any;
  }>;
};

const initialState: Context = {
  state: {
    hotels: [],
    prices: { USD: [], CNY: [], KRW: [], SGD: [] },
    loading: { hotels: "REQUEST", prices: "REQUEST" },
    selectedCurrency: "USD",
  },
  dispatch: () => {},
};

const AppContext = React.createContext<Context>(initialState);

export const useAppContext = () => useContext(AppContext);

export const useAPI = () => {
  const {dispatch} = useContext(AppContext)
  return apiWrapper(dispatch)
}

const AppContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState.state);
  const api = apiWrapper(dispatch)

  // fetch initial list of hotels and usd currency
  useEffect(() => {
    function fetchInitData() {
      api.fetchHotels()
      api.fetchPrices('USD')
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
