import { FC, useEffect, useState } from "react";
import Api from "@/utils/api";
import { ItemSummary } from "@/models";
import { Loader } from "@/components";
import { useSearchParams } from "react-router-dom";
import { SearchResultItem } from "./search-result-item";
import { SearchResultSectionProps } from "./search-result-section.types";
import "@/assets/styles/css/components/search-result-section.css";

export const SearchResultSection: FC<SearchResultSectionProps> = ({
  setCategories,
}) => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<ItemSummary[]>([]);

  document.title = `Resultados de búsqueda para ${searchQuery}`;

  useEffect(() => {
    const handleSearchItems = async (searchQuery: string) => {
      setCategories([]);
      setIsLoading(true);
      const response = await Api.searchItems(searchQuery);
      setCategories(response.categories);
      setItems(response.items);
      setIsLoading(false);
    };

    if (!searchQuery) return;
    handleSearchItems(searchQuery);
  }, [searchQuery, setCategories]);

  if (isLoading)
    //Lo mejor en realidad seria que el SearchResultItem tenga su propio skeleton de carga y no mover el contenido
    return (
      <div className="loading-container">
        <Loader size={50} />
      </div>
    );

  return (
    <>
      <meta name="description" content="Busqueda de productos" />
      <div className="container">
        <div className="items-container">
          {items.length > 0 ? (
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  <SearchResultItem item={item} />
                </li>
              ))}
            </ul>
          ) : (
            <h2>No se encontraron resultados para {searchQuery}</h2>
          )}
        </div>
      </div>
    </>
  );
};
