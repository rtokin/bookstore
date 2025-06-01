import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { AppRouter } from "./routes"
import { CartProvider } from "./contexts/CartContext"
import { ModalProvider } from "./contexts/ModalContext"
import { ModalRenderer } from "./components/ModalRenderer"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CartProvider>
      <ModalProvider>
        <AppRouter />
        {/* Это место «на самом верху» вложения RouterProvider */}
        {/* Когда придёт сигнал открыть модалку → ModalRenderer отрендерит окно */}
        <ModalRenderer />
      </ModalProvider>
    </CartProvider>
  </React.StrictMode>
)
