import React from "react";
import { render } from "@testing-library/react";
import ScrollToTop from ".";
import { useLocation } from "react-router-dom";

const mockUseLocation = useLocation as jest.Mock;

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
}));

const scrollSpy = jest.spyOn(window, "scrollTo");

describe("scroll to top", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("scrolls to top when rerendered with new path", () => {
    mockUseLocation.mockReturnValue({ pathname: "/path1" });
    const { rerender } = render(<ScrollToTop />);
    expect(scrollSpy).toBeCalledTimes(1);
    expect(scrollSpy).toBeCalledWith(0, 0);
    scrollSpy.mockClear();
    mockUseLocation.mockReturnValue({ pathname: "/path2" });
    rerender(<ScrollToTop />);
    expect(scrollSpy).toBeCalledTimes(1);
    expect(scrollSpy).toBeCalledWith(0, 0);
  });

  it("does not scroll if rerendered with the same path", () => {
    mockUseLocation.mockReturnValue({ pathname: "/path1" });
    const { rerender } = render(<ScrollToTop />);
    expect(scrollSpy).toBeCalledTimes(1);
    expect(scrollSpy).toBeCalledWith(0, 0);
    scrollSpy.mockClear();
    rerender(<ScrollToTop />);
    expect(scrollSpy).toBeCalledTimes(0);
  });
});
