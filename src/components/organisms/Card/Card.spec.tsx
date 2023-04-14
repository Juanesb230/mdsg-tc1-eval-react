import { render, screen } from "@testing-library/react";
import { Card } from "./card";

const gif = {
  name: "bulbasaur",
  url: "https://media.tenor.com/WxflQIGfOYkAAAAj/spider-man-no-way-home-marvel-studios.gif",
};

describe("Card", () => {
  it("should render the Card image", () => {
    render(<Card name={gif.name} url={gif.url} />);
    const gifInput = screen.getByAltText(
      "https://media.tenor.com/WxflQIGfOYkAAAAj/spider-man-no-way-home-marvel-studios.gif"
    );
    expect(gifInput).toBeVisible();
  });
});
