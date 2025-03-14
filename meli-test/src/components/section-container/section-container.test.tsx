import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, BrowserRouter as Router } from "react-router-dom";
import { SectionContainer } from "./section-container";
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
describe("SectionContainer Integration Test", () => {
  test("should render welcome message on '/' route", async () => {
    render(
      <Router>
        <SectionContainer />
      </Router>
    );

    expect(
      screen.getByText(
        /!Bienvenido a Mercado Libre! Sientete libre de buscar lo que desees/i
      )
    ).toBeInTheDocument();
  });
  test("should render search results on '/items' route", async () => {
    (Api.searchItems as jest.Mock).mockResolvedValueOnce({
      categories: mockCategories,
      items: mockItems,
    });

    render(
      <MemoryRouter initialEntries={[`/items?search=producto1`]}>
        <SectionContainer />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mockItems[0].title)).toBeInTheDocument();
      expect(screen.getByText(mockItems[1].title)).toBeInTheDocument();
    });
  });

  test("should render product detail on '/item/:id' route", async () => {
    const mockItem = {
      picture: "https://example.com/image.jpg",
      condition: "new",
      sold_quantity: 10,
      title: "Producto de prueba",
      price: { amount: 1000, currency: "ARS" },
      free_shipping: true,
      description: "Descripción de prueba",
    };

    (Api.getItemDetail as jest.Mock).mockResolvedValue({ item: mockItem });

    render(
      <MemoryRouter initialEntries={[`/items/1`]}>
        <SectionContainer />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mockItem.title)).toBeInTheDocument();
      expect(
        screen.getByText(mockItem.price.amount + " " + mockItem.price.currency)
      ).toBeInTheDocument();
      expect(
        screen.getByText(mockItem.condition === "new" ? "Nuevo" : "Usado")
      ).toBeInTheDocument();
      expect(screen.getByText("Envío gratis")).toBeInTheDocument();
      expect(
        screen.getByText(mockItem.description || "Sin descripción.")
      ).toBeInTheDocument();
      expect(screen.getByAltText("Imagen del producto")).toHaveAttribute(
        "src",
        mockItem.picture
      );
    });
  });

  test("should render 'page not found' message on invalid route", () => {
    render(
      <MemoryRouter initialEntries={[`/asdasd`]}>
        <SectionContainer />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Ops! Parece que la página que buscas no existe./i)
    ).toBeInTheDocument();
  });
});
