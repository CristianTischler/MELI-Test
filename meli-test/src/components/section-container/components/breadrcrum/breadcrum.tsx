import { FC } from "react";
import { BreadcrumbProps } from "./breadcrum.types";
import "@/assets/styles/css/components/breadcrum.css";

export const Breadcrumb: FC<BreadcrumbProps> = ({ categories }) => {
  return (
    <ul className="breadcrumb">
      {categories.map((category) => (
        <li className="item" key={category}>
          {category}
        </li>
      ))}
    </ul>
  );
};
