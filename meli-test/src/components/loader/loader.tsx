"use client";
import React from "react";
import "../../assets/styles/css/components/loader.styles.css";
import { LoaderProps } from "./loader.types";

export const Loader: React.FC<LoaderProps> = ({ size }: LoaderProps) => {
  return (
    <div className="loader" style={{ width: size, height: size }}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
