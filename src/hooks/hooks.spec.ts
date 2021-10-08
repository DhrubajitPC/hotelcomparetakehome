import { useComparisons } from ".";
import * as context from "../state/Context";

describe("#Hooks", () => {
  let mock: jest.SpyInstance;

  beforeAll(() => {
    jest.mock("../utils", () => ({
      __esModule: true,
      formatPrice: jest.fn(),
    }));
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mock = jest.spyOn(context, "useAppContext");
  });

  it("should return a sorted comparisons object with formatted prices when there are compeitors", () => {
    mock.mockReturnValueOnce({
      state: {
        prices: [
          {
            id: 1,
            price: 110,
            competitors: {
              airbnb: 120,
              expedia: 100,
            },
          },
        ],
        selectedCurrency: "USD",
      },
    });

    const comparisons = useComparisons(1);

    expect(comparisons).toMatchObject([
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
    ]);
  });

  
  it("should return a sorted comparisons object with formatted prices when there are compeitors and we have no price", () => {
    mock.mockReturnValueOnce({
      state: {
        prices: [
          {
            id: 1,
            competitors: {
              airbnb: 120,
              expedia: 100,
            },
          },
        ],
        selectedCurrency: "USD",
      },
    });

    const comparisons = useComparisons(1);

    expect(comparisons).toMatchObject([
      {
        name: "expedia",
        price: 100,
        currency: "USD",
      },
      {
        name: "airbnb",
        price: 120,
        currency: "USD",
      },
    ]);
  });
  it("should return an empty array if there are no competitors", () => {
    mock.mockReturnValueOnce({
      state: {
        prices: [
          {
            id: 1,
            price: 110,
          },
        ],
        selectedCurrency: "USD",
      },
    });

    const comparisons = useComparisons(1);
    expect(comparisons).toMatchObject([]);
  });
});
