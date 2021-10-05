import { render } from "@testing-library/react";
import React from "react";
import HotelsList from ".";

const mockContext = {
  state: {
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
    loading: { hotel: false, pricing: false },
    selectedCurrency: "USD",
  },
};

jest.mock("../../state/context.tsx", () => ({
  __esmodule: true,
  useAppContext: () => mockContext,
}));

describe("HotelInfo", () => {
  beforeAll(() => {});
  it("should render correctly", () => {
    const { container } = render(<HotelsList />);
    expect(container).toMatchSnapshot();
  });
});
