import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AppRouter } from "./routes";
import { CartProvider } from "./contexts/CartContext";
import { ModalProvider } from "./contexts/ModalContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CartProvider>
      <ModalProvider>
        <AppRouter />
      </ModalProvider>
    </CartProvider>
  </React.StrictMode>
);
