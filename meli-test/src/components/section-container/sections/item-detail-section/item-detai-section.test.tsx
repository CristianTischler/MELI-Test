import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ItemDetailSection } from "./item-detail-section";
import Api from "../../../../utils/api";

jest.mock("../../../../utils/api");

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

const renderComponent = (id: string) => {
  return render(
    <MemoryRouter initialEntries={[`/item/${id}`]}>
      <Routes>
        <Route path="/item/:id" element={<ItemDetailSection />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("ItemDetailSection", () => {
  test("Show loader", async () => {
    renderComponent("1");

    expect(screen.getByTestId("loader")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(mockItem.title)).toBeInTheDocument()
    );

    expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
  });

  test("Displays product data correctly", async () => {
    renderComponent("1");

    await waitFor(() =>
      expect(screen.getByText(mockItem.title)).toBeInTheDocument()
    );

    expect(screen.getByText(mockItem.title)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockItem.price.amount} ${mockItem.price.currency}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockItem.condition === "new" ? "Nuevo" : "Usado")
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${mockItem.sold_quantity} vendidos`)
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

  test("Does not display sold quantity if not available", async () => {
    const mockItemWithoutQuantity = { ...mockItem, sold_quantity: null };
    renderComponent("1");

    await waitFor(() =>
      expect(
        screen.getByText(mockItemWithoutQuantity.title)
      ).toBeInTheDocument()
    );

    expect(
      screen.queryByText(`${mockItemWithoutQuantity.sold_quantity} vendidos`)
    ).toBeNull();
  });

  test("Has accessibility labels and titles", async () => {
    renderComponent("1");

    await waitFor(() =>
      expect(screen.getByText(mockItem.title)).toBeInTheDocument()
    );

    const buyButton = screen.getByRole("button", { name: /comprar/i }); //Utilizo i para que sea case insensitive
    expect(buyButton).toHaveAttribute("aria-label", "Botón para comprar");
    expect(buyButton).toHaveAttribute(
      "title",
      "Haga click aquí para comprar el item."
    );
  });
});
