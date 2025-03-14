import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Breadcrumb } from "./breadcrum";

const categoriesMock = [
  "Home",
  "Autos, Motos y Otros",
  "Autos y Camionetas",
  "Chevrolet",
  "Cruze",
];

describe("Breadcrumb", () => {
  it("should render the breadcrumb component", () => {
    render(<Breadcrumb categories={categoriesMock} />);

    categoriesMock.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });
});
