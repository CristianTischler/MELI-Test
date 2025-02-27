import { FC, useEffect } from "react";
import { EmptyMessageSectionProps } from "./empty-message-section.types";
import "@/assets/styles/css/components/empty-message-section.css";

export const EmptyMessageSection: FC<EmptyMessageSectionProps> = ({
  message,
  setCategories,
}) => {
  useEffect(() => {
    setCategories([]);
  }, [setCategories]);

  return (
    <>
      <meta name="description" content="Mensaje por parte de la pagina"></meta>
      <section className="section-message">
        <div className="message-container">
          <p className="message">{message}</p>
        </div>
      </section>
    </>
  );
};
