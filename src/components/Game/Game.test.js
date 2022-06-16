import Game from "./Game";
import imgSample from "../../assets/pexels-oziel-gómez-849835-cropped.jpg";
import { render, screen } from "@testing-library/react";

describe("Game", () => {
  it("renders board game component ", () => {
    render(<Game />);
    const linkElement = screen.getByTestId("game");
    expect(linkElement).toBeInTheDocument();
  });
});
