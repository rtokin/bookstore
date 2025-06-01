import { FunctionComponent, useCallback } from 'react';
import styles from '../styles/Navbar.module.css';


const Navbar:FunctionComponent = () => {
  	
  	const onProfileClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	return (
    		<div className={styles.navbar}>
      			<img className={styles.profileIcon} alt="" src="../public/images/profile.svg" onClick={onProfileClick} />
      			<div className={styles.searchbar}>
        				<img className={styles.iconMagnifyingGlass} alt="" src={`images/icon_magnifying_glass.svg`} />
        				<div className={styles.div}>Поиск</div>
      			</div>
      			<div className={styles.logo}>
        				<img className={styles.logoIcon} alt="" src="images/Logo.svg" />
        				<b className={styles.streetbook}>StreetBook</b>
        				<b className={styles.b}>Магазин современной литературы</b>
      			</div>
      			<div className={styles.backet} onClick={onProfileClick}>
        				<img className={styles.backetChild} alt="" src="images/rectangle4.svg" />
        				<img className={styles.iconCart} alt="" src={`images/icon_backet.svg`} />
        				<div className={styles.backetItem} />
        				<div className={styles.div1}>0</div>
      			</div>
    		</div>);
};

export default Navbar;
