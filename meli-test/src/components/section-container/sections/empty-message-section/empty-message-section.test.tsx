import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { EmptyMessageSection } from "./empty-message-section";

const setCategoriesMock = jest.fn();
const message = "Ops! parece que la pagina solicitada no existe";

describe("EmptyMessageSection", () => {
  it("should render the message passed as prop", () => {
    render(
      <EmptyMessageSection
        message={message}
        setCategories={setCategoriesMock}
      />
    );

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("should call setCategories with an empty array", () => {
    render(
      <EmptyMessageSection
        message={message}
        setCategories={setCategoriesMock}
      />
    );

    expect(setCategoriesMock).toHaveBeenCalledWith([]); //Verifico si ejecute la funcion del useEffect con el array vacio
  });

  it("should render the meta tag with the correct description", () => {
    render(
      <EmptyMessageSection
        message={message}
        setCategories={setCategoriesMock}
      />
    );

    const metaTag = document.querySelector("meta[name='description']");
    expect(metaTag).toHaveAttribute(
      "content",
      "Mensaje por parte de la pagina"
    );
  });
});
