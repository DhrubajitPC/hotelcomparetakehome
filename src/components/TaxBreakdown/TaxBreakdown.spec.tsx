import { render } from "@testing-library/react";
import TaxBreakdown from ".";
import React from "react";

describe("HotelInfo", () => {
  it("should render correctly", () => {
    const { container } = render(<TaxBreakdown tax={20} hotelFees={100} />);
    expect(container).toMatchSnapshot();
  });
});
