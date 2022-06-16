import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { MemoryRouter as Router } from "react-router-dom";

test("renders home component", () => {
  render(
    <Router>
      <Home />
    </Router>
  );
  const linkElement = screen.getByText(/Wybierz planszę/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders boards to choose", () => {
  render(
    <Router>
      <Home />
    </Router>
  );
  const linkElement = screen.getByTestId("chooseBoard");
  expect(linkElement).toBeInTheDocument();
});

test("renders 9 boards to choose", () => {
  render(
    <Router>
      <Home />
    </Router>
  );
  const linkElement = screen.getByTestId("chooseBoard").childElementCount;
  expect(linkElement).toBe(9);
});
