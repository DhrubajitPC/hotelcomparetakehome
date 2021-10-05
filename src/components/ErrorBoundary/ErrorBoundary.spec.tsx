import { fireEvent, render, screen } from "@testing-library/react";
import React, { FC } from "react";
import ErrorBoundary from ".";

// suppress error for this file
jest.spyOn(console, "error").mockImplementation(() => jest.fn());

describe("ErrorBoundary", () => {
  let BuggyComponent: FC<{ flag: boolean }>;
  const { location } = window;

  beforeAll(() => {
    BuggyComponent = ({ flag }) => {
      if (flag) throw new Error("ooops");
      else return <div>mock</div>;
    };

    delete window.location;
    window.location = { reload: jest.fn() };
  });

  afterAll(() => {
    window.location = location;
  });

  it("Should display error boundary when there is a rendering error", () => {
    render(
      <ErrorBoundary>
        <BuggyComponent flag={true} />
      </ErrorBoundary>
    );

    // need to disable overlay in dev mode for create-react-app
    fireEvent.keyDown(document.body, {
      key: "Escape",
      code: 27,
    });

    expect(
      screen.getByRole("heading", { name: /Oops... Something went wrong./ })
    ).toBeInTheDocument();
  });

  it("Should not display error boundary where there is no rendering error", () => {
    render(
      <ErrorBoundary>
        <BuggyComponent flag={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/mock/)).toBeInTheDocument();
  });

  it("Should reload the page when magic button is clicked", () => {
    render(
      <ErrorBoundary>
        <BuggyComponent flag={true} />
      </ErrorBoundary>
    );

    // need to disable overlay in dev mode for create-react-app
    fireEvent.keyDown(document.body, {
      key: "Escape",
      code: 27,
    });

    const spy = jest
      .spyOn(window.location, "reload")
      .mockImplementation(() => jest.fn());

    fireEvent.click(screen.getByRole("button", { name: /Magic Fix/ }));

    expect(spy).toHaveBeenCalled();
  });
});
