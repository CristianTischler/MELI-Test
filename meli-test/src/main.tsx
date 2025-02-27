import { createRoot } from "react-dom/client";
import "./index.styles.scss";
import Home from "./pages/home/home";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Home />
  </BrowserRouter>
);
