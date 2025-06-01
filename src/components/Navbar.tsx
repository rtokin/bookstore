// src/components/Navbar.tsx

import React, { FunctionComponent, useCallback, useState } from "react";
import styles from "../styles/Navbar.module.css";
import Registration from "./Registration";
import Login from "./Login";

const Navbar: FunctionComponent = () => {
  const [isRegOpen, setIsRegOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Обработчик клика по иконке профиля
  const onProfileClick = useCallback(() => {
    // Открываем окно регистрации:
    setIsRegOpen(true);
    setIsLoginOpen(false);
  }, []);

  // Закрыть модалку регистрации
  const closeRegistration = useCallback(() => {
    setIsRegOpen(false);
  }, []);

  // Закрыть модалку логина
  const closeLogin = useCallback(() => {
    setIsLoginOpen(false);
  }, []);

  // Переключиться с регистрации на окно входа
  const switchToLogin = useCallback(() => {
    setIsRegOpen(false);
    setIsLoginOpen(true);
  }, []);

  // Переключиться с логина на регистрацию
  const switchToRegister = useCallback(() => {
    setIsLoginOpen(false);
    setIsRegOpen(true);
  }, []);

  return (
    <div className={styles.navbar}>
      <img
        className={styles.profileIcon}
        alt="profile"
        src="/images/profile.svg"
        onClick={onProfileClick}
      />
      <div className={styles.searchbar}>
        <img
          className={styles.iconMagnifyingGlass}
          alt="search"
          src="/images/icon_magnifying_glass.svg"
        />
        <div className={styles.div}>Поиск</div>
      </div>
      <div className={styles.logo}>
        <img className={styles.logoIcon} alt="logo" src="/images/Logo.svg" />
        <b className={styles.streetbook}>StreetBook</b>
        <b className={styles.b}>Магазин современной литературы</b>
      </div>
      <div className={styles.backet} onClick={() => {}}>
        {/* ваша корзина (здесь можно потом выводить кол-во товаров) */}
        <img
          className={styles.backetChild}
          alt="basket"
          src="/images/rectangle4.svg"
        />
        <img className={styles.iconCart} alt="cart" src="/images/icon_backet.svg" />
        <div className={styles.backetItem} />
        <div className={styles.div1}>0</div>
      </div>

      {/* ─────────── ВСТАВКА МОДАЛОК ──────────── */}

      {isRegOpen && (
        <Registration onClose={closeRegistration} switchToLogin={switchToLogin} />
      )}
      {isLoginOpen && (
        <Login onClose={closeLogin} switchToRegister={switchToRegister} />
      )}
    </div>
  );
};

export default Navbar;
