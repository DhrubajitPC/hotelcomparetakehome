import { render } from "@testing-library/react";
import React, { FC } from "react";
import * as A from "./actions";
import AppContextProvider, { useAppContext } from "./Context";

describe("#AppContextProvider", () => {
  let TestComponent: FC;
  let mockData: string;

  beforeAll(() => {
    mockData = "some mock string";
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
    expect(getByTestId("content")).toHaveTextContent(/some mock string/);
  });
});
