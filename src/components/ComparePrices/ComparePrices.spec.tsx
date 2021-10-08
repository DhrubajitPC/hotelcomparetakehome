import { render, screen } from "@testing-library/react";
import ComparePrices from ".";

const mockComparions = [
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

jest.mock("../../hooks", () => ({
  __esModule: true,
  useComparisons: () => mockComparions,
}));

describe("#ComparePrices", () => {
  it("should render correctly", () => {
    const { container } = render(<ComparePrices hotelId={1} />);
    expect(container).toMatchSnapshot();
    expect(screen.getByText(/The Competition/i)).toBeInTheDocument();
    expect(screen.getByText(/120/)).toHaveClass("strikeThrough");
  });
});
