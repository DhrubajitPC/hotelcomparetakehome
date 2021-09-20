import { Reducer } from "react";
import * as A from "./actions";
import { State } from "./types";

export const reducer: Reducer<State, { type: string; payload: any }> = (
  draft,
  action
) => {
  switch (action.type) {
    case A.REPLACE:
      return action.payload;
  }
};
