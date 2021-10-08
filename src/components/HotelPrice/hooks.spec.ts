import { usePriceBreakdown, useSavings } from "./hooks";

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

let mockComparisons = [
  {
    name: "expedia",
    price: 100,
    currency: "USD",
  },
  {
    name: "Us",
    price: 110,
    currency: "USD",
  },
  {
    name: "airbnb",
    price: 120,
    currency: "USD",
  },
];

jest
  .mock("../../hooks", () => ({
    __esModule: true,
    useComparisons: () => mockComparisons,
  }))
  .mock("../../state/Context", () => ({
    __esModule: true,
    useAppContext: () => ({
      state: {
        prices: mockPrice,
      },
    }),
  }));

describe("#HOOKS", () => {
  it("usePriceBreakdown - should return the price breakdown correctly when price and taxes are present", () => {
    let breakdown = usePriceBreakdown(2);
    expect(breakdown).toMatchObject({
      totalPrice: 164,
      tax: 13.12,
      hotelFees: 16.4,
    });
  });

  it("usePriceBreakdown - should return the price breakdown correctly when price is absent", () => {
    mockPrice = [
      {
        id: 2,
        taxes_and_fees: {
          tax: 13.12,
          hotel_fees: 16.4,
        },
      },
    ];

    const breakdown = usePriceBreakdown(2);
    expect(breakdown).toMatchObject({
      totalPrice: "Rates Unavailable",
      tax: 13.12,
      hotelFees: 16.4,
    });
  });

  it("usePriceBreakdown - should return the price breakdown correctly when taxes_and_fees is absent", () => {
    mockPrice = [
      {
        id: 2,
        price: 164,
      },
    ];

    const breakdown = usePriceBreakdown(2);
    expect(breakdown).toMatchObject({
      totalPrice: 164,
      tax: undefined,
      hotelFees: undefined,
    });
  });

  it("useSavings - should return the calculated savings", () => {
    const mockDataSavings = ((120 - 110) / 120) * 100;
    const savings = useSavings(2);
    expect(savings).toEqual(mockDataSavings);
  });

  it("useSavings - should return null when there is no comparison", () => {
    mockComparisons = [];
    const savings = useSavings(2);
    expect(savings).toBeNull();
  });

  it("useSavings - should return null when 'Us' is not in comparison", () => {
    mockComparisons = [
      {
        name: "expedia",
        price: 100,
        currency: "USD",
      },
    ];
    const savings = useSavings(2);
    expect(savings).toBeNull();
  });

  it("useSavings - should return null if 'Us' is last in comparison list", () => {
    mockComparisons = [
      {
        name: "expedia",
        price: 100,
        currency: "USD",
      },
      {
        name: "Us",
        price: 130,
        currency: "USD",
      },
    ];
    const savings = useSavings(2);
    expect(savings).toBeNull();
  });
});
