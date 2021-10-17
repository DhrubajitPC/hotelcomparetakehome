import { fireEvent, render, screen } from "@testing-library/react";
import Tooltip from ".";
import React, { FC } from "react";

describe("#Tooltip", () => {
  let BodyComponent: FC;
  beforeAll(() => {
    BodyComponent = () => <p>Mock para</p>;
  });

  it("should render correctly", () => {
    const { container } = render(<Tooltip body={<BodyComponent />}></Tooltip>);
    expect(container).toMatchSnapshot();
  });

  it("should show body component when hovered over", () => {
    render(<Tooltip body={<BodyComponent />}></Tooltip>);
    const element = screen.getByTestId("tooltip-container");
    expect(screen.queryByText(/Mock para/i)).toBeNull();
    fireEvent.mouseEnter(element);
    expect(screen.getByText(/Mock para/i)).toBeInTheDocument();
    fireEvent.mouseLeave(element);
    expect(screen.queryByText(/Mock para/i)).toBeNull();
  });
});
