import { render } from "@testing-library/react";
import React from "react";
import HotelInfo, { Props } from ".";

describe("HotelInfo", () => {
  let props: Props;
  beforeAll(() => {
    props = {
      address: "some address",
      name: "Shinagawa Prince Hotel",
      rating: 7.7,
      stars: 4,
      photo: "photo url",
      description: "some mock description",
      price: 100,
      currency: "SGD",
      onBook: () => {},
    };
  });
  it("should render correctly", () => {
    const { container } = render(<HotelInfo {...props} />);
    expect(container).toMatchSnapshot();
  });
});
