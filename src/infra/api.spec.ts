import A from "../state/actions";
import { Currency } from "../state/types";
import { apiWrapper } from "./api";
import { browserStore } from "./browserStore";
import {
  HOTELS_URL,
  PRICE_CNY_URL,
  PRICE_KRW_URL,
  PRICE_SGD_URL,
  PRICE_USD_URL,
} from "./urls";

describe("#Api", () => {
  let fetchMock: jest.SpyInstance;
  let api: {
    fetchPrices: (currency: Currency) => void;
    fetchHotels: () => void;
  };
  let dispatch: () => void;

  beforeAll(() => {
    fetchMock = jest.spyOn(global, "fetch");
    jest.spyOn(browserStore, "setItem");
    dispatch = jest.fn();
    api = apiWrapper(dispatch);
  });

  afterAll(() => {
    fetchMock.mockClear();
  });

  it("#fetchPrices - should fetch the prices for the correct currency", () => {
    api.fetchPrices("CNY");
    expect(fetchMock).toHaveBeenCalledWith(PRICE_CNY_URL);
    api.fetchPrices("KRW");
    expect(fetchMock).toHaveBeenCalledWith(PRICE_KRW_URL);
    api.fetchPrices("SGD");
    expect(fetchMock).toHaveBeenCalledWith(PRICE_SGD_URL);
    api.fetchPrices("USD");
    expect(fetchMock).toHaveBeenCalledWith(PRICE_USD_URL);
  });

  it("#fetchPrices - should dipatch data correctly when successful request", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ["some price"],
    });
    await api.fetchPrices("CNY");
    expect(dispatch).toHaveBeenCalledWith({
      type: A.FETCH_PRICE_REQUEST,
      payload: "",
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: A.FETCH_PRICE_SUCCESS,
      payload: {
        currency: "CNY",
        data: ["some price"],
      },
    });

    expect(browserStore.setItem).toBeCalledWith("currency", "CNY");

    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  it("#fetchPrices - should dispatch data correctly when failed request", async () => {
    fetchMock.mockRejectedValueOnce({
      ok: false,
      status: 500,
      statusText: "oops... something went wrong",
    });
    await api.fetchPrices("CNY");
    expect(dispatch).toHaveBeenCalledWith({
      type: A.FETCH_PRICE_REQUEST,
      payload: "",
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: A.FETCH_PRICE_FAILURE,
      payload: {
        ok: false,
        status: 500,
        statusText: "oops... something went wrong",
      },
    });

    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  it("#fetchHotels - should call the hotel url correctly", () => {
    api.fetchHotels();
    expect(fetchMock).toHaveBeenCalledWith(HOTELS_URL);
  });

  it("#fetchHotels - should dipatch data correctly when successful request", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ["some hotel"],
    });
    await api.fetchHotels();
    expect(dispatch).toHaveBeenCalledWith({
      type: A.FETCH_HOTELS_REQUEST,
      payload: "",
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: A.FETCH_HOTELS_SUCCESS,
      payload: ["some hotel"],
    });

    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  it("#fetchHotels - should dispatch data correctly when failed request", async () => {
    fetchMock.mockRejectedValueOnce({
      ok: false,
      status: 500,
      statusText: "oops... something went wrong",
    });
    await api.fetchHotels();
    expect(dispatch).toHaveBeenCalledWith({
      type: A.FETCH_HOTELS_REQUEST,
      payload: "",
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: A.FETCH_HOTELS_FAILURE,
      payload: {
        ok: false,
        status: 500,
        statusText: "oops... something went wrong",
      },
    });

    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
