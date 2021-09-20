import React, { FC, useContext, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { HOTELS_URL } from "../infra/urls";
import { reducer } from "./reducers";
import { State } from "./types";
import * as A from "./actions";
import fetch from "../infra/api";

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
    loading: { hotel: true, pricing: false },
    selectedCurrency: "USD",
  },
  dispatch: () => {},
};

const AppContext = React.createContext<Context>(initialState);

export const useAppContext = () => useContext(AppContext);

const AppContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState.state);

  // fetch initial list of hotels
  useEffect(() => {
    async function fetchInitData() {
      try {
        const data = await fetch<Context["state"]["hotels"]>(HOTELS_URL);
        dispatch({
          payload: data,
          type: A.FETCH_HOTELS_REQUEST,
        });
      } catch (e) {
        console.error("error trying to fetch hotels");
      }
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
