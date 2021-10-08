import { fireEvent, render } from "@testing-library/react";
import React from "react";
import CurrencySelect from ".";

let mockFetch = jest.fn();
jest.mock("../../state/Context", () => ({
  __esModule: true,
  useAPI: () => ({
    fetchPrices: mockFetch,
  }),
  useAppContext: () => ({
    state: {
      selectedCurrency: "CNY",
    },
  }),
}));

describe("CurrencySelect", () => {
  it("should render correctly", () => {
    const { container } = render(<CurrencySelect />);
    expect(container).toMatchSnapshot();
    expect(container.getElementsByTagName("select")[0]).toHaveValue("CNY");
    expect(container.getElementsByTagName("select")[0]).not.toHaveValue("USD");
  });

  it("should request new price data when selection is changed", () => {
    const { container } = render(<CurrencySelect />);

    fireEvent.change(container.getElementsByTagName("select")[0], {
      target: { value: "SGD" },
    });
    expect(mockFetch).toHaveBeenCalledWith("SGD");
  });
});
