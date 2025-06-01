// src/contexts/ModalContext.tsx
import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import Registration from "../components/Registration";
import Login from "../components/Login";
import OrderModal from "../components/OrderModal";

interface ModalContextValue {
  openRegister(): void;
  openLogin(): void;
  openOrder(): void;
  closeModal(): void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal должен быть внутри ModalProvider");
  return ctx;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<"none" | "register" | "login" | "order">("none");

  const openRegister = useCallback(() => setActiveModal("register"), []);
  const openLogin    = useCallback(() => setActiveModal("login"), []);
  const openOrder    = useCallback(() => setActiveModal("order"), []);
  const closeModal   = useCallback(() => setActiveModal("none"), []);

  return (
    <ModalContext.Provider value={{ openRegister, openLogin, openOrder, closeModal }}>
      {children}

      {activeModal === "register" && (
        <Registration
          onClose={() => closeModal()}
          switchToLogin={() => {
            closeModal();
            openLogin();
          }}
        />
      )}
      {activeModal === "login" && (
        <Login
          onClose={() => closeModal()}
          switchToRegister={() => {
            closeModal();
            openRegister();
          }}
        />
      )}
      {activeModal === "order" && <OrderModal onClose={() => closeModal()} />}
    </ModalContext.Provider>
  );
};
