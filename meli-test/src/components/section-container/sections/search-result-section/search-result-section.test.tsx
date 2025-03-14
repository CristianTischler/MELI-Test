import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { SearchResultSection } from "./search-result-section";
import Api from "@/utils/api";

jest.mock("@/utils/api");

const mockItems = [
  {
    id: "1",
    title: "Producto 1",
    price: { amount: 1000, currency: "ARS" },
    picture: "https://example.com/image1.jpg",
  },
  {
    id: "2",
    title: "Producto 2",
    price: { amount: 2000, currency: "ARS" },
    picture: "https://example.com/image2.jpg",
  },
];

const mockCategories = ["Electrónica", "Hogar"];

beforeEach(() => {
  jest.clearAllMocks();
});

const renderComponent = (searchQuery: string) => {
  return render(
    <MemoryRouter initialEntries={[`/items?search=${searchQuery}`]}>
      <Routes>
        <Route
          path="/items"
          element={<SearchResultSection setCategories={() => {}} />}
        />
      </Routes>
    </MemoryRouter>
  );
};

describe("SearchResultSection", () => {
  test("Shows loader while fetching data", async () => {
    (Api.searchItems as jest.Mock).mockResolvedValueOnce({
      categories: mockCategories,
      items: [],
    });

    renderComponent("productos");

    expect(screen.getByTestId("loader")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument()
    );
  });

  test("Displays search results correctly", async () => {
    (Api.searchItems as jest.Mock).mockResolvedValueOnce({
      categories: mockCategories,
      items: mockItems,
    });

    renderComponent("productos");

    await waitFor(() =>
      expect(screen.getByText(mockItems[0].title)).toBeInTheDocument()
    );
    expect(screen.getByText(mockItems[1].title)).toBeInTheDocument();
  });

  test("Displays message when no results are found", async () => {
    (Api.searchItems as jest.Mock).mockResolvedValueOnce({
      categories: mockCategories,
      items: [],
    });

    renderComponent("producto inexistente");

    await waitFor(() =>
      expect(
        screen.getByText(
          "No se encontraron resultados para producto inexistente"
        )
      ).toBeInTheDocument()
    );
  });

  test("Sets document title based on search query", async () => {
    (Api.searchItems as jest.Mock).mockResolvedValueOnce({
      categories: mockCategories,
      items: mockItems,
    });
    renderComponent("teclado");

    await waitFor(() =>
      expect(document.title).toBe("Resultados de búsqueda para teclado")
    );
  });
});
