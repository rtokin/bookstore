import { FunctionComponent } from 'react';
import styles from '../styles/Footer.module.css';


const Footer:FunctionComponent = () => {
  	return (
    		<div className={styles.footer}>
      			<div className={styles.footerChild} />
      			<div className={styles.theme}>
        				<div className={styles.themeChild} />
        				<div className={styles.div}>Главная</div>
        				<div className={styles.div1}>Каталог</div>
        				<div className={styles.div2}>Профиль</div>
        				<div className={styles.div3}>Купоны и скидки</div>
        				<div className={styles.div4}>Спец. предложения</div>
        				<div className={styles.div5}>Поиск по сайту</div>
        				<div className={styles.div6}>Корзина</div>
        				<div className={styles.div7}>Доставка и оплата</div>
        				<div className={styles.div8}>Правила продажи</div>
        				<div className={styles.streetbook}>© 2025, StreetBook</div>
        				<div className={styles.div9}>О нас</div>
        				<div className={styles.div10}>Наши магазины</div>
        				<div className={styles.div11}>Контакты</div>
      			</div>
      			<div className={styles.teh}>
        				<div className={styles.heftyfkgmailcom}>heft.yfk@gmail.com</div>
        				<img className={styles.telegram1Icon} alt="" src="telegram 1.png" />
        				<img className={styles.discord1Icon} alt="" src="discord 1.png" />
        				<img className={styles.vk1Icon} alt="" src="vk 1.png" />
        				<img className={styles.iconHeadphones} alt="" src={`🦆 icon "headphones".svg`} />
      			</div>
    		</div>);
};

export default Footer;
