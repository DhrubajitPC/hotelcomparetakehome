import React, { FC, useContext } from "react";
import { useImmerReducer } from "use-immer";
import { reducer } from "./reducers";
import { State } from "./types";

type Context = {
  state: State;
  dispatch: React.Dispatch<{
    type: string;
    payload: any;
  }>;
};

const AppContext = React.createContext<Context>({
  state: [] as State,
  dispatch: () => {},
});

export const useAppContext = () => useContext(AppContext);

const AppContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useImmerReducer(reducer, [] as State);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
