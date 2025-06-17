import * as React from 'react'
import { FunctionComponent, useCallback } from 'react'
import styles from '../styles/header.module.css'
import { useModal } from '../contexts/ModalContext' // ← импортируем хук

const Header: FunctionComponent = () => {
  // из контекста модалок достаём функцию открытия регистрации
  const { openRegister } = useModal()

  // Обработчик нажатия на «профиль»
  const onProfileContainerClick = useCallback(() => {
    openRegister()
  }, [openRegister])

  return (
    <div className={styles.header}>
      <img
        className={styles.fontIcon}
        alt=""
        src="../public/images/header-bg.jpg"
      />

      <div className={styles.logo}>
        <img
          className={styles.logoIcon}
          alt=""
          src="../public/images/Logo.svg"
        />
        <b className={styles.streetbook}>StreetBook</b>
        <b className={styles.b}>Магазин современной литературы</b>
      </div>

      <div className={styles.buttons}>
        {/* Блок «Профиль» (весь контейнер кликабельный) */}
        <div
          className={styles.profile}
          onClick={onProfileContainerClick}
        >
          <img
            className={styles.logoIcon1}
            alt=""
            src="../public/images/profile.svg"
          />
          <div className={styles.div}>Личный кабинет</div>
        </div>

        {/* Блок «Поиск» */}
        <div className={styles.searchbar}>
          <img
            className={styles.iconMagnifyingGlass}
            alt=""
            src={`../public/images/icon_magnifying_glass.svg`}
          />
          <div className={styles.div}>Поиск</div>
        </div>

        {/* Дополнительные кнопки */}
        <img
          className={styles.buttonsChild}
          src="../public/images/rectangle3.svg"
          alt="фон"
        />
        <img
          className={styles.iconInfo}
          src="../public/images/info.svg"
          alt="i"
        />
        <div className={styles.div1}>О нас</div>
      </div>

      {/* Если по стрелке вниз тоже нужно открывать тот же модал — оставляем тот же обработчик */}
      <img
        className={styles.sideDownIcon}
        alt=""
      />
    </div>
  )
}

export default Header
