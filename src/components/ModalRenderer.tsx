import React from "react"
import { useModal } from "../contexts/ModalContext"
import Registration from "./Registration"
import Login from "./Login"

export const ModalRenderer: React.FC = () => {
  const { currentModal, closeModal, openLogin, openRegister } = useModal()

  // Если ничего не открыто → не рендерим вообще
  if (currentModal === "none") {
    return null
  }

  // Если открыта «регистрация»:
  if (currentModal === "register") {
    return (
      <Registration
        onClose={closeModal}
        switchToLogin={() => {
          // переключаем на модалку «Login»
          openLogin()
        }}
      />
    )
  }

  // Если открыта «вход»:
  if (currentModal === "login") {
    return (
      <Login
        onClose={closeModal}
        switchToRegister={() => {
          // переключаем на модалку «Registration»
          openRegister()
        }}
      />
    )
  }

  return null
}
