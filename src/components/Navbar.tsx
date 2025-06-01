// src/components/Navbar.tsx

import React, { FunctionComponent, useCallback, useState } from 'react'
import styles from '../styles/Navbar.module.css'
import Registration from './Registration'
import Login from './Login'

const Navbar: FunctionComponent = () => {
  // 1) modalType: какое модальное окно сейчас открыто
  const [modalType, setModalType] = useState<'none' | 'register' | 'login'>('none')

  const openRegistration = useCallback(() => {
    setModalType('register')
  }, [])

  const openLogin = useCallback(() => {
    setModalType('login')
  }, [])

  const closeAllModals = useCallback(() => {
    setModalType('none')
  }, [])

  // Нажатие на иконку «Профиль» открывает Registration
  const onProfileClick = useCallback(() => {
    openRegistration()
  }, [openRegistration])

  return (
    <>
      {/* ──────────────────────────────────────────────────────────────────── */}
      {/*                    Старая часть Navbar (без изменений)                 */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <div className={styles.navbar}>
        {/* Иконка «Профиль» */}
        <img
          className={styles.profileIcon}
          alt=""
          src="/images/profile.svg"
          onClick={onProfileClick}
        />

        {/* Поисковая строка */}
        <div className={styles.searchbar}>
          <img
            className={styles.iconMagnifyingGlass}
            alt=""
            src="/images/icon_magnifying_glass.svg"
          />
          <div className={styles.div}>Поиск</div>
        </div>

        {/* Логотип */}
        <div className={styles.logo}>
          <img className={styles.logoIcon} alt="" src="/images/Logo.svg" />
          <b className={styles.streetbook}>StreetBook</b>
          <b className={styles.b}>Магазин современной литературы</b>
        </div>

        {/* Корзина (без клика открытия модалки) */}
        <div className={styles.backet}>
          <img className={styles.backetChild} alt="" src="/images/rectangle4.svg" />
          <img className={styles.iconCart} alt="" src="/images/icon_backet.svg" />
          <div className={styles.backetItem} />
          <div className={styles.div1}>0</div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/*         Если modalType === 'register', показываем Registration         */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      {modalType === 'register' && (
        <Registration
          onLoginLinkClick={() => {
            // Переключиться на окно логина
            setModalType('login')
          }}
          onClose={closeAllModals}
        />
      )}

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/*           Если modalType === 'login', показываем Login               */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      {modalType === 'login' && <Login onClose={closeAllModals} />}
    </>
  )
}

export default Navbar
