import React, { FunctionComponent, useCallback, useRef } from 'react'
import styles from '../styles/Body.module.css';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'


const Body: FunctionComponent = () => {

	const onProfileClick = useCallback(() => {
		// Add your code here
	}, []);
	const comingPrevRef = useRef<HTMLDivElement>(null)
	const comingNextRef = useRef<HTMLDivElement>(null)
	return (
		<div className={styles.body}>
			<div className={styles.body1}>
				<div className={styles.font}>
					<img className={styles.unsplashrarnGq1sbaIcon} alt="" src="../public/images/unsplash_rarn_gq1SBA.png" />
					<img className={styles.unsplashrarnGq1sbaIcon1} alt="" src="../public/images/unsplash_rarn_gq1SBA.png" />
					<img className={styles.unsplashrarnGq1sbaIcon2} alt="" src="../public/images/unsplash_rarn_gq1SBA.png" />
					<img className={styles.unsplashDank9gjvdyIcon} alt="" src="../public/images/unsplash__dAnK9GJvdY.svg" />
					<img className={styles.unsplashDank9gjvdyIcon1} alt="" src="../public/images/unsplash__dAnK9GJvdY.svg" />
					<img className={styles.unsplashDank9gjvdyIcon2} alt="" src="../public/images/unsplash__dAnK9GJvdY.svg" />
				</div>
				<div className={styles.navbar}>
					<img className={styles.profileIcon} alt="" src="../public/images/rectangle5.svg" onClick={onProfileClick} />
					<img className={styles.profileIcon} alt="" src="../public/images/profile.svg" onClick={onProfileClick} />
					<div className={styles.searchbar}>
						<img className={styles.iconMagnifyingGlass} alt="" src={`../public/images/icon_magnifying_glass.svg`} />
						<div className={styles.div}>Поиск</div>
					</div>
					<div className={styles.logo}>
						<img className={styles.logoIcon} alt="" src="../public/images/Logo.svg" />
						<b className={styles.streetbook}>StreetBook</b>
						<b className={styles.b}>Магазин современной литературы</b>
					</div>
					<div className={styles.backet} onClick={onProfileClick}>
						<img className={styles.backetChild} alt="" src="../public/images/rectangle4.svg" />
						<img className={styles.iconCart} alt="" src={`../public/images/icon_backet.svg`} />
						<div className={styles.backetItem} />
						<div className={styles.div1}>0</div>
					</div>
				</div>
				<b className={styles.b1}>Новинки</b>
				<b className={styles.b2}>Лучшие из лучших</b>
				<b className={styles.b3}>Скоро в продаже</b>
				<div className={styles.fullgroupcarouselcomingsoonboo}>






					<img className={styles.arrowsIcon} alt="" src="../public/images/arrows_left.svg" />
					<div className={styles.productCase}>
						<img className={styles.productphotoIcon} alt="" src="../public/images/01968837-14f6-793c-ac91-375d4fa65c11.webp" />
						<b className={styles.descriptionofbook}>Леди и Бродяга</b>
						<div className={styles.authorofbook}>Ксюша Левина</div>
						<div className={styles.priceofbook}>460 ₽</div>
						<div className={styles.buybox} onClick={onProfileClick} />
						<div className={styles.buy}>Купить</div>
						<div className={styles.starbox} />
						<img className={styles.productCaseChild} alt="" src="../public/images/Star1.svg" />
						<img className={styles.productCaseItem} alt="" src="../public/images/Star2.svg" />
						<img className={styles.productCaseInner} alt="" src="../public/images/Star3.svg" />
						<img className={styles.starIcon} alt="" src="../public/images/Star4.svg" />
						<img className={styles.productCaseChild1} alt="" src="../public/images/Star5.svg" />
					</div>
					<div className={styles.productCase}>
						<img className={styles.productphotoIcon} alt="" src="../public/images/0194612f-6f3e-76f8-b9d9-53b27e4c50b3.webp" />
						<b className={styles.descriptionofbook}>Железное пламя</b>
						<div className={styles.authorofbook}>Ребекка Яррос</div>
						<div className={styles.priceofbook}>1480 ₽</div>
						<div className={styles.buybox} onClick={onProfileClick} />
						<div className={styles.buy}>Купить</div>
						<div className={styles.starbox} />
						<img className={styles.productCaseChild} alt="" src="../public/images/Star1.svg" />
						<img className={styles.productCaseItem} alt="" src="../public/images/Star2.svg" />
						<img className={styles.productCaseInner} alt="" src="../public/images/Star3.svg" />
						<img className={styles.starIcon} alt="" src="../public/images/Star4.svg" />
						<img className={styles.productCaseChild1} alt="" src="../public/images/Star5.svg" />
					</div>
					<div className={styles.productCase}>
						<img className={styles.productphotoIcon} alt="" src="../public/images/0194612f-769a-7959-a6c2-ec47fbb2dacf.webp" />
						<b className={styles.descriptionofbook}>Прачечная</b>
						<div className={styles.authorofbook}>Ким Чжи Юн</div>
						<div className={styles.priceofbook}>770 ₽</div>
						<div className={styles.buybox} onClick={onProfileClick} />
						<div className={styles.buy}>Купить</div>
						<div className={styles.starbox} />
						<img className={styles.productCaseChild} alt="" src="../public/images/Star1.svg" />
						<img className={styles.productCaseItem} alt="" src="../public/images/Star2.svg" />
						<img className={styles.productCaseInner} alt="" src="../public/images/Star3.svg" />
						<img className={styles.starIcon} alt="" src="../public/images/Star4.svg" />
						<img className={styles.productCaseChild1} alt="" src="../public/images/Star5.svg" />
					</div>
					<div className={styles.productCase}>
						<img className={styles.productphotoIcon} alt="" src="../public/images/018fadf7-19f4-7044-b104-d0260121be9d.webp" />
						<b className={styles.descriptionofbook}>Правда о деле Квеберта</b>
						<div className={styles.authorofbook}>Жоэль Диккер</div>
						<div className={styles.priceofbook}>1300 ₽</div>
						<div className={styles.buybox} onClick={onProfileClick} />
						<div className={styles.buy}>Купить</div>
						<div className={styles.starbox} />
						<img className={styles.productCaseChild} alt="" src="../public/images/Star1.svg" />
						<img className={styles.productCaseItem} alt="" src="../public/images/Star2.svg" />
						<img className={styles.productCaseInner} alt="" src="../public/images/Star3.svg" />
						<img className={styles.starIcon} alt="" src="../public/images/Star4.svg" />
						<img className={styles.productCaseChild1} alt="" src="../public/images/Star5.svg" />
					</div>
					<img className={styles.arrowsIcon1} alt="" src="../public/images/arrows_right.svg" />
				</div>
				<div className={styles.fullgroupcarouselbestofthebest}>
					<img className={styles.arrowsIcon} alt="" src="arrows.svg" />
					<div className={styles.productCase}>
						<img className={styles.productphotoIcon} alt="" src="ProductPhoto.png" />
						<b className={styles.descriptionofbook}>Кафе на краю земли</b>
						<div className={styles.authorofbook}>Джон Стрелеки</div>
						<div className={styles.priceofbook}>310 ₽</div>
						<div className={styles.buybox} onClick={onProfileClick} />
						<div className={styles.buy}>Купить</div>
						<div className={styles.starbox} />
						<img className={styles.productCaseChild} alt="" src="Star 1.svg" />
						<img className={styles.productCaseItem} alt="" src="Star 2.svg" />
						<img className={styles.productCaseInner} alt="" src="Star 3.svg" />
						<img className={styles.starIcon} alt="" src="Star 4.svg" />
						<img className={styles.productCaseChild1} alt="" src="Star 5.svg" />
					</div>
					<div className={styles.productCase}>
						<img className={styles.productphotoIcon} alt="" src="ProductPhoto.png" />
						<b className={styles.descriptionofbook}>Черные кувшинки</b>
						<div className={styles.authorofbook}>Мишель Бюсси</div>
						<div className={styles.priceofbook}>1480 ₽</div>
						<div className={styles.buybox} onClick={onProfileClick} />
						<div className={styles.buy}>Купить</div>
						<div className={styles.starbox} />
						<img className={styles.productCaseChild} alt="" src="Star 1.svg" />
						<img className={styles.productCaseItem} alt="" src="Star 2.svg" />
						<img className={styles.productCaseInner} alt="" src="Star 3.svg" />
						<img className={styles.starIcon} alt="" src="Star 4.svg" />
						<img className={styles.productCaseChild1} alt="" src="Star 5.svg" />
					</div>
					<div className={styles.productCase}>
						<img className={styles.productphotoIcon} alt="" src="ProductPhoto.png" />
						<b className={styles.descriptionofbook}>Берсерк. Том 10</b>
						<div className={styles.authorofbook}>Кэнтаро Миура</div>
						<div className={styles.priceofbook}>1879 ₽</div>
						<div className={styles.buybox} onClick={onProfileClick} />
						<div className={styles.buy}>Купить</div>
						<div className={styles.starbox} />
						<img className={styles.productCaseChild} alt="" src="Star 1.svg" />
						<img className={styles.productCaseItem} alt="" src="Star 2.svg" />
						<img className={styles.productCaseInner} alt="" src="Star 3.svg" />
						<img className={styles.starIcon} alt="" src="Star 4.svg" />
						<img className={styles.productCaseChild1} alt="" src="Star 5.svg" />
					</div>
					<div className={styles.productCase}>
						<img className={styles.productphotoIcon} alt="" src="ProductPhoto.png" />
						<b className={styles.descriptionofbook}>Непокорная ведьма</b>
						<div className={styles.authorofbook}>Кристен Чиккарелли</div>
						<div className={styles.priceofbook}>1300 ₽</div>
						<div className={styles.buybox} onClick={onProfileClick} />
						<div className={styles.buy}>Купить</div>
						<div className={styles.starbox} />
						<img className={styles.productCaseChild} alt="" src="Star 1.svg" />
						<img className={styles.productCaseItem} alt="" src="Star 2.svg" />
						<img className={styles.productCaseInner} alt="" src="Star 3.svg" />
						<img className={styles.starIcon} alt="" src="Star 4.svg" />
						<img className={styles.productCaseChild1} alt="" src="Star 5.svg" />
					</div>
					<img className={styles.arrowsIcon1} alt="" src="arrows.svg" />
				</div>
				
				<div className={styles.fullgroupcarouselnewestbooks}>
					<img className={styles.arrowsIcon} alt="" src="arrows.svg" />
					<div className={styles.productCase}>
						<img className={styles.productphotoIcon} alt="" src="ProductPhoto.png" />
						<b className={styles.descriptionofbook}>Скиталец. Лживые предания</b>
						<div className={styles.authorofbook}>Анастасия Князь</div>
						<div className={styles.priceofbook}>930 ₽</div>
						<div className={styles.buybox} onClick={onProfileClick} />
						<div className={styles.buy}>Купить</div>
						<div className={styles.starbox} />
						<img className={styles.productCaseChild} alt="" src="Star 1.svg" />
						<img className={styles.productCaseItem} alt="" src="Star 2.svg" />
						<img className={styles.productCaseInner} alt="" src="Star 3.svg" />
						<img className={styles.starIcon} alt="" src="Star 4.svg" />
						<img className={styles.productCaseChild1} alt="" src="Star 5.svg" />
					</div>
					<div className={styles.productCase}>
						<img className={styles.productphotoIcon} alt="" src="ProductPhoto.png" />
						<b className={styles.descriptionofbook}>Спешащие во тьму</b>
						<div className={styles.authorofbook}>Адам Нэвилл</div>
						<div className={styles.priceofbook}>850 ₽</div>
						<div className={styles.buybox} onClick={onProfileClick} />
						<div className={styles.buy}>Купить</div>
						<div className={styles.starbox} />
						<img className={styles.productCaseChild} alt="" src="Star 1.svg" />
						<img className={styles.productCaseItem} alt="" src="Star 2.svg" />
						<img className={styles.productCaseInner} alt="" src="Star 3.svg" />
						<img className={styles.starIcon} alt="" src="Star 4.svg" />
						<img className={styles.productCaseChild1} alt="" src="Star 5.svg" />
					</div>
					<div className={styles.productCase}>
						<img className={styles.productphotoIcon} alt="" src="ProductPhoto.png" />
						<b className={styles.descriptionofbook}>Комната правды</b>
						<div className={styles.authorofbook}>Юки Синъитиро</div>
						<div className={styles.priceofbook}>563 ₽</div>
						<div className={styles.buybox} onClick={onProfileClick} />
						<div className={styles.buy}>Купить</div>
						<div className={styles.starbox} />
						<img className={styles.productCaseChild} alt="" src="Star 1.svg" />
						<img className={styles.productCaseItem} alt="" src="Star 2.svg" />
						<img className={styles.productCaseInner} alt="" src="Star 3.svg" />
						<img className={styles.starIcon} alt="" src="Star 4.svg" />
						<img className={styles.productCaseChild1} alt="" src="Star 5.svg" />
					</div>
					<div className={styles.productCase}>
						<img className={styles.productphotoIcon} alt="" src="ProductPhoto.png" />
						<b className={styles.descriptionofbook}>Проверка на бессмертие</b>
						<div className={styles.authorofbook}>Мэй</div>
						<div className={styles.priceofbook11}>980  ₽</div>
						<div className={styles.buybox} onClick={onProfileClick} />
						<div className={styles.buy}>Купить</div>
						<div className={styles.starbox} />
						<img className={styles.productCaseChild} alt="" src="Star 1.svg" />
						<img className={styles.productCaseItem} alt="" src="Star 2.svg" />
						<img className={styles.productCaseInner} alt="" src="Star 3.svg" />
						<img className={styles.starIcon} alt="" src="Star 4.svg" />
						<img className={styles.productCaseChild1} alt="" src="Star 5.svg" />
					</div>
					<img className={styles.arrowsIcon1} alt="" src="arrows.svg" />
				</div>
			</div>
		</div>);
};

export default Body;
