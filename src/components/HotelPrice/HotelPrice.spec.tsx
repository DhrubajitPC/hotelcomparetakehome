import { fireEvent, render, screen } from "@testing-library/react";
import HotelPrice from ".";

let mockPrice: Array<Record<any, any>> = [
  {
    id: 2,
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
];

let mockPriceBreakdown: Record<any, any> = {
  totalPrice: 120,
  tax: 11.11,
  hotelFees: 22,
};

jest
  .mock("./hooks", () => ({
    __esModule: true,
    usePriceBreakdown: () => mockPriceBreakdown,
    useSavings: () => 10,
  }))
  .mock("../../state/Context", () => ({
    __esModule: true,
    useAppContext: () => ({
      state: {
        prices: mockPrice,
        selectedCurrency: "SGD",
      },
    }),
  }));

describe("#HotelPrice", () => {
  it("should render hotelPrice component correctly when there is a breakdown", () => {
    const { container } = render(<HotelPrice hotelId={2} />);
    const tooltipWrapper = screen.getByTestId("tooltip-container");
    fireEvent.mouseEnter(tooltipWrapper);
    expect(container).toMatchSnapshot();
  });

  it("should render hotelPrice component correctly when there is no price", () => {
    mockPriceBreakdown = {
      totalPrice: "Rates Unavailable",
      tax: undefined,
      hotelFees: undefined,
    };

    const { container } = render(<HotelPrice hotelId={2} />);
    expect(container).toMatchSnapshot();
  });

  it("should render hotelPrice component correctly when there is no breakdown", () => {
    mockPriceBreakdown = {
      totalPrice: 120,
      tax: undefined,
      hotelFees: undefined,
    };

    const { container } = render(<HotelPrice hotelId={2} />);
    expect(container).toMatchSnapshot();
  });
});
