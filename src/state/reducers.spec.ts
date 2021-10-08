import Actions from "./actions";
import { reducer } from "./reducers";
import { State } from "./types";

describe("#REDUCERS", () => {
  let initialState: State;

  beforeEach(() => {
    initialState = {
      hotels: [],
      prices: [],
      selectedCurrency: "USD",
      loading: {
        hotels: "SUCCESS",
        prices: "SUCCESS",
      },
    };
  });

  it("should replace the state if REPLACE action is dispatched", () => {
    const updateAction = { type: Actions.REPLACE, payload: "mock value" };
    const newState = reducer(initialState, updateAction);
    expect(newState).toBe("mock value");
  });

  it("should update the state if FETCH_HOTELS_SUCCESS action is dispatched", () => {
    const updateAction = {
      type: Actions.FETCH_HOTELS_SUCCESS,
      payload: ["mock hotel data"],
    };
    reducer(initialState, updateAction);
    expect(initialState.hotels).toMatchObject(["mock hotel data"]);
    expect(initialState.loading.hotels).toBe("SUCCESS");
  });

  it("should update the state if FETCH_HOTELS_FAILURE action is dispatched", () => {
    const updateAction = {
      type: Actions.FETCH_HOTELS_FAILURE,
      payload: new Error("some error"),
    };
    reducer(initialState, updateAction);
    expect(initialState.hotels).toMatchObject([]);
    expect(initialState.loading.hotels).toBe("FAILURE");
  });

  it("should update the state if FETCH_HOTELS_REQUEST action is dispatched", () => {
    const updateAction = {
      type: Actions.FETCH_HOTELS_REQUEST,
      payload: "",
    };
    reducer(initialState, updateAction);
    expect(initialState.hotels).toMatchObject([]);
    expect(initialState.loading.hotels).toBe("REQUEST");
  });

  it("should update the state if FETCH_PRICE_SUCCESS action is dispatched", () => {
    const updateAction = {
      type: Actions.FETCH_PRICE_SUCCESS,
      payload: {
        data: ["mock price data"],
        currency: "SGD",
      },
    };
    reducer(initialState, updateAction);
    expect(initialState.prices).toMatchObject(["mock price data"]);
    expect(initialState.selectedCurrency).toBe("SGD");
    expect(initialState.loading.prices).toBe("SUCCESS");
  });
  it("should update the state if FETCH_PRICE_FAILURE action is dispatched", () => {
    const updateAction = {
      type: Actions.FETCH_PRICE_FAILURE,
      payload: new Error("some error"),
    };
    reducer(initialState, updateAction);
    expect(initialState.prices).toMatchObject([]);
    expect(initialState.loading.prices).toBe("FAILURE");
  });
  it("should update the state if FETCH_PRICE_REQUEST action is dispatched", () => {
    const updateAction = {
      type: Actions.FETCH_PRICE_REQUEST,
      payload: "",
    };
    reducer(initialState, updateAction);
    expect(initialState.prices).toMatchObject([]);
    expect(initialState.loading.prices).toBe("REQUEST");
  });
});
