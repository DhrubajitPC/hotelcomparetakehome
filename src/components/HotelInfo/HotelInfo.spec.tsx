import { render } from "@testing-library/react";
import React from "react";
import HotelInfo from ".";
import { Hotel } from "../../state/types";

describe("#HotelInfo", () => {
  let props: Hotel;
  beforeAll(() => {
    props = {
      id: 1,
      address: "some address",
      name: "Shinagawa Prince Hotel",
      rating: 7.7,
      stars: 4,
      photo: "photo url",
      description: "some mock description",
    };
  });
  it("should render correctly", () => {
    const { container } = render(<HotelInfo {...props} />);
    expect(container).toMatchSnapshot();
  });
});
