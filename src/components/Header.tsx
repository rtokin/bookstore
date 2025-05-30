import * as React from 'react'
import { FunctionComponent, useCallback } from 'react';
import styles from '../styles/header.module.css';

const Header: FunctionComponent = () => {

  const onProfileContainerClick = useCallback(() => {
    // Add your code here
  }, []);

  return (
    <div className={styles.header}>
      <img className={styles.fontIcon} alt="" src="../public/images/header-bg.jpg" />
      <div className={styles.logo}>
        <img className={styles.logoIcon} alt="" src="../public/images/Logo.svg" />
        <b className={styles.streetbook}>StreetBook</b>
        <b className={styles.b}>Магазин современной литературы</b>
      </div>
      <div className={styles.buttons}>
        <div className={styles.profile} onClick={onProfileContainerClick}>
          <img className={styles.logoIcon1} alt="" src="../public/images/profile.svg" />
          <div className={styles.div}>Личный кабинет</div>
        </div>
        <div className={styles.searchbar}>
          <img className={styles.iconMagnifyingGlass} alt="" src={`../public/images/icon_magnifying_glass.svg`} />
          <div className={styles.div}>Поиск</div>
        </div>
          <img className={styles.buttonsChild} src="../public/images/rectangle3.svg" alt="фон" />
          <img className={styles.iconInfo} src="../public/images/info.svg" alt="i" />
          <div className={styles.div1}>О нас</div>
        </div>
      <img className={styles.sideDownIcon} alt="" src="../public/images/arrow1.svg" onClick={onProfileContainerClick} />
    </div>);
};

export default Header;
