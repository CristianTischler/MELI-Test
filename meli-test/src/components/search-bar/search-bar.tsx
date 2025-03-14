import { FC, useState } from "react";
import "../../assets/styles/css/components/search-bar.styles.css";
import { LINK, PLACEHOLDER, SEARCH } from "./search-bar.constants";
import { useNavigate, useSearchParams } from "react-router-dom";

export const SearchBar: FC = () => {
  //Podria utilizar react-hook-form para manejar el estado del input pero creo que es demasiado para este ejemplo
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const navigate = useNavigate();

  //Para el que llegue a leer esto...
  //Tener en cuenta useCallBack para evitar que se cree una nueva funcion cada vez que se renderiza el componente. Suerte!
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (searchQuery) {
      navigate(`/items?search=${searchQuery}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <header className="search-bar">
      <form onSubmit={handleSubmit} className="search-bar-form">
        <a
          className="nav-logo"
          href={LINK}
          aria-label="Ir a la página de inicio"
        />
        <input
          type="text"
          id="search"
          placeholder={PLACEHOLDER}
          className="search-bar-input"
          value={searchQuery}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" className="search-bar-button">
          <img src="/searchIcon.svg" alt={SEARCH} className="button-img" />
        </button>
      </form>
    </header>
  );
};
