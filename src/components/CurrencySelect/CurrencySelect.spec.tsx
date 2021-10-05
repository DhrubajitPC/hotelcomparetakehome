import { render } from "@testing-library/react";
import React from "react";
import CurrencySelect from ".";

describe("CurrencySelect", () => {
  it("should render correctly", () => {
    const { container } = render(<CurrencySelect />);
    expect(container).toMatchSnapshot();
  });
});
