import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchBar } from "./search-bar";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  mockNavigate.mockClear();
});

describe("SearchBar Component", () => {
  test("should render search input and button", () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    expect(
      screen.getByPlaceholderText("Nunca dejes de buscar")
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("should update input value when typing", () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Nunca dejes de buscar");

    fireEvent.change(input, { target: { value: "Laptop" } });
    expect(input).toHaveValue("Laptop");
  });

  test("should navigate to '/items?search=Laptop' when Enter is pressed", () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Nunca dejes de buscar");

    fireEvent.change(input, { target: { value: "Laptop" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockNavigate).toHaveBeenCalledWith("/items?search=Laptop");
  });

  test("should navigate to '/items?search=Laptop' when clicking search button", () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Nunca dejes de buscar");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Laptop" } });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/items?search=Laptop");
  });

  test("should not navigate if search input is empty", () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
