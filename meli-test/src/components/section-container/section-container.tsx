import { FC, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { SearchResultSection } from "./sections";
import { EmptyMessageSection } from "./sections/empty-message-section";
import { ItemDetailSection } from "./sections/item-detail-section/item-detail-section";
import { Breadcrumb } from "./components";
import "@/assets/styles/css/components/section-container.styles.css";

export const SectionContainer: FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  return (
    <main className="main" role="main">
      <div className="container">
        <Breadcrumb categories={categories} />
        <Routes>
          <Route
            path="/"
            element={
              <EmptyMessageSection
                message="!Bienvenido a Mercado Libre! 
              Sientete libre de buscar lo que desees"
                setCategories={setCategories}
              />
            }
          />
          <Route
            path="/items"
            element={<SearchResultSection setCategories={setCategories} />}
          />
          <Route path="/items/:id" element={<ItemDetailSection />} />
          <Route
            path="*"
            element={
              <EmptyMessageSection
                message="Ops! 
              Parece que la página que buscas 
              no existe."
                setCategories={setCategories}
              />
            }
          />
        </Routes>
      </div>
    </main>
  );
};
