import { FC } from "react";
import { SearchResultItemsProps } from "./search-result-section.types";
import { Link } from "react-router";
import "@/assets/styles/css/components/search-result-item.css";
import { formatPrice } from "@/utils/formatters";

export const SearchResultItem: FC<SearchResultItemsProps> = ({ item }) => {
  return (
    <Link className="link" to={`/items/${item.id}`}>
      <article className="result-item">
        <div className="container-image">
          <img
            src={item.picture}
            className="item-image"
            alt="Imagen de item"
            loading="lazy"
          />
        </div>

        <div className="container-data">
          <h3 className="price" aria-label="Precio">
            {formatPrice(item.price.amount) + " " + item.price.currency}
            {item.free_shipping ? (
              <span className="free-shipping" title="Envío gratis">
                Envío gratis
              </span>
            ) : null}
          </h3>
          <h2 className="title">{item.title}</h2>
        </div>
      </article>
    </Link>
  );
};
