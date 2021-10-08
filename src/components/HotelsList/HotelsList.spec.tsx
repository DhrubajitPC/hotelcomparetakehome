import { render } from "@testing-library/react";
import React from "react";
import HotelsList from ".";
import { State } from "../../state/types";

const mockContext: State = {
  hotels: [
    {
      id: 1,
      name: "mock hotel name",
      rating: 3,
      stars: 4,
      address: "mock address",
      photo: "image url",
      description: "mock description",
    },
  ],
  prices: [
    {
      id: 1,
      price: 164,
      competitors: {
        Traveloka: 190,
        Expedia: 163,
      },
      taxes_and_fees: {
        tax: 13.12,
        hotel_fees: 16.4,
      },
    },
  ],
  loading: { hotels: "SUCCESS", prices: "SUCCESS" },
  selectedCurrency: "USD",
};

jest.mock("../../state/context.tsx", () => ({
  __esmodule: true,
  useAppContext: () => ({
    state: mockContext,
  }),
}));

describe("#HotelList", () => {
  it("should render correctly", () => {
    const { container } = render(<HotelsList />);
    expect(container).toMatchSnapshot();
  });
});
