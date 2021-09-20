import { render } from "@testing-library/react";
import React, { FC } from "react";
import AppContextProvider, { useAppContext } from "./Context";
import { Currency, Hotel } from "./types";
import * as A from "./actions";

describe("AppContextProvider", () => {
  let TestComponent: FC;
  let mockData: Hotel & { price: Record<string, Currency> };

  beforeAll(() => {
    mockData = {
      id: 1,
      name: "Shinagawa Prince Hotel",
      rating: 7.7,
      stars: 4,
      address: "some address",
      photo: "photo url",
      description: "some mock description",
      price: {},
    };
    TestComponent = () => {
      const { state, dispatch } = useAppContext();

      return (
        <>
          <div data-testid="content">{JSON.stringify(state, null, 2)}</div>
          <button
            data-testid="btn"
            onClick={() =>
              dispatch({
                type: A.REPLACE,
                payload: mockData,
              })
            }
          >
            Update app data
          </button>
        </>
      );
    };
  });

  it("Should provide application context correctly to all children", () => {
    const { getByTestId } = render(
      <AppContextProvider>
        <TestComponent />
      </AppContextProvider>
    );

    getByTestId("btn").click();
    expect(getByTestId("content")).toHaveTextContent(/some mock description/);
  });
});
