import React, { createContext, useContext, useState, ReactNode, useCallback } from "react"

// Возможные типы модалок
type ModalType = "none" | "register" | "login"

interface ModalContextValue {
  currentModal: ModalType
  openRegister: () => void
  openLogin: () => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined)

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentModal, setCurrentModal] = useState<ModalType>("none")

  const openRegister = useCallback(() => {
    setCurrentModal("register")
  }, [])

  const openLogin = useCallback(() => {
    setCurrentModal("login")
  }, [])

  const closeModal = useCallback(() => {
    setCurrentModal("none")
  }, [])

  return (
    <ModalContext.Provider value={{ currentModal, openRegister, openLogin, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

// Хук для доступа к ModalContext
export function useModal(): ModalContextValue {
  const ctx = useContext(ModalContext)
  if (!ctx) {
    throw new Error("useModal must be used inside ModalProvider")
  }
  return ctx
}
