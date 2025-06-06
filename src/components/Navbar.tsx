import React, { FunctionComponent, useCallback } from "react"
import { useNavigate } from "@tanstack/react-router"
import styles from "../styles/Navbar.module.css"
import { useCart } from "../contexts/CartContext"
import { useModal } from "../contexts/ModalContext"

const Navbar: FunctionComponent = () => {
  const navigate = useNavigate({ from: "/" })
  const { totalCount } = useCart()
  const { openRegister } = useModal()

  // Перейти в корзину
  const onCartClick = () => {
    navigate({ to: "/cart" })
  }

  // Открыть модалку регистрации
  const onProfileClick = useCallback(() => {
    openRegister()
  }, [openRegister])

  // Перейти на главную
  const onLogoClick = () => {
    navigate({ to: "/" })
  }

  return (
    <div className={styles.navbar}>
      <img
        className={styles.profileIcon}
        alt="Profile"
        src="../public/images/profile.svg"
        onClick={onProfileClick}
      />

      <div className={styles.searchbar}>
        <img
          className={styles.iconMagnifyingGlass}
          alt="Search"
          src={`images/icon_magnifying_glass.svg`}
        />
        <div className={styles.div}>Поиск</div>
      </div>

      {/* Блок логотипа теперь кликабельный */}
      <div
        className={styles.logo}
        onClick={onLogoClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onLogoClick()
          }
        }}
      >
        <img className={styles.logoIcon} alt="Logo" src="images/Logo.svg" />
        <b className={styles.streetbook}>StreetBook</b>
        <b className={styles.b}>Магазин современной литературы</b>
      </div>

      <div className={styles.backet} onClick={onCartClick}>
        <img
          className={styles.backetChild}
          alt="Basket background"
          src="images/rectangle4.svg"
        />
        <img
          className={styles.iconCart}
          alt="Cart"
          src={`images/icon_backet.svg`}
        />
        <div className={styles.backetItem} />
        <div className={styles.div1}>{totalCount}</div>
      </div>
    </div>
  )
}

export default Navbar
