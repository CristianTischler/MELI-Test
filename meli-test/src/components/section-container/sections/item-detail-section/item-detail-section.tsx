import { Loader } from "@/components/loader";
import { ItemDetail } from "@/models";
import Api from "@/utils/api";
import { formatPrice } from "@/utils/formatters";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "@/assets/styles/css/components/item-detail-section.css";

export const ItemDetailSection: FC = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState<ItemDetail | null>(null);

  const handleItemChanged = async (itemId: string) => {
    setIsLoading(true);
    const response = await Api.getItemDetail(itemId);
    setItem(response.item);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!id) return;
    handleItemChanged(id);
  }, [id]);

  if (isLoading)
    return (
      <div className="loading-container">
        <Loader size={50} />
      </div>
    );

  return (
    <>
      <meta name="description" content="Detalle del producto" />
      <div className="container">
        <section className="section-container">
          {item && (
            <article className="item-detail">
              <div className="row">
                <div className="image-container">
                  <img
                    className="image"
                    src={item.picture}
                    alt="Imagen del producto"
                  />
                </div>
                <div className="detail-container">
                  <span className="additional-data">
                    <span>{item.condition === "new" ? "Nuevo" : "Usado"}</span>
                    {item.sold_quantity ? <span>&nbsp;-&nbsp;</span> : null}
                    {item.sold_quantity ? (
                      <span aria-label="Cantidad de unidades vendidas">
                        {item.sold_quantity} vendidos
                      </span>
                    ) : null}
                  </span>
                  <h1 className="title" aria-label="Título" title={item.title}>
                    {item.title}
                  </h1>
                  <h2 className="price" aria-label="Precio">
                    {formatPrice(item.price.amount) + " " + item.price.currency}
                  </h2>
                  {item.free_shipping ? (
                    <h3 className="free-shipping">Envío gratis</h3>
                  ) : null}
                  <button
                    className="button-buy"
                    type="button"
                    tabIndex={0}
                    title="Haga click aquí para comprar el item."
                    aria-label="Botón para comprar"
                  >
                    Comprar
                  </button>
                </div>
              </div>
              <div className="description-container">
                <h2 className="item-detail__description-title">
                  Descripción del producto
                </h2>
                <p
                  className="item-detail__description"
                  aria-label="Descripción del producto"
                >
                  {item.description ? item.description : "Sin descripción."}
                </p>
              </div>
            </article>
          )}
        </section>
      </div>
    </>
  );
};
