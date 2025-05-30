import * as React from 'react';
import { FunctionComponent, useCallback, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import styles from './Body.module.css'

const Body: FunctionComponent = () => {
  const onProfileClick = useCallback(() => {
    // Add your code here
  }, [])

  // Refs for custom navigation
  const newPrevRef = useRef<HTMLDivElement>(null)
  const newNextRef = useRef<HTMLDivElement>(null)
  const bestPrevRef = useRef<HTMLDivElement>(null)
  const bestNextRef = useRef<HTMLDivElement>(null)
  const comingPrevRef = useRef<HTMLDivElement>(null)
  const comingNextRef = useRef<HTMLDivElement>(null)

  return (
    <div className={styles.body}>
      <div className={styles.font}>
        {/* Background images */}
        <img className={styles.unsplashrarnGq1sbaIcon} alt="" src="unsplash:rarn_gq1SBA.png" />
        <img className={styles.unsplashrarnGq1sbaIcon1} alt="" src="unsplash:rarn_gq1SBA.png" />
        <img className={styles.unsplashrarnGq1sbaIcon2} alt="" src="unsplash:rarn_gq1SBA.png" />
        <img className={styles.unsplashDank9gjvdyIcon} alt="" src="unsplash:_dAnK9GJvdY.png" />
        <img className={styles.unsplashDank9gjvdyIcon1} alt="" src="unsplash:_dAnK9GJvdY.png" />
        <img className={styles.unsplashDank9gjvdyIcon2} alt="" src="unsplash:_dAnK9GJvdY.png" />
        <img className={styles.unsplashrarnGq1sbaIcon3} alt="" src="unsplash:rarn_gq1SBA.png" />
        <img className={styles.unsplashrarnGq1sbaIcon4} alt="" src="unsplash:rarn_gq1SBA.png" />
        <img className={styles.unsplashrarnGq1sbaIcon5} alt="" src="unsplash:rarn_gq1SBA.png" />
      </div>

      <div className={styles.navbar}>
        <img className={styles.profileIcon} alt="" src="profile.svg" onClick={onProfileClick} />
        <div className={styles.searchbar}>
          <img className={styles.iconMagnifyingGlass} alt="" src={`🦆 icon "magnifying glass".svg`} />
          <div className={styles.div}>Поиск</div>
        </div>
        <div className={styles.logo}>
          <img className={styles.logoIcon} alt="" src="Logo.svg" />
          <b className={styles.streetbook}>StreetBook</b>
          <b className={styles.b}>Магазин современной литературы</b>
        </div>
        <div className={styles.backet} onClick={onProfileClick}>
          <img className={styles.backetChild} alt="" src="Rectangle 4.svg" />
          <img className={styles.iconCart} alt="" src={`🦆 icon "cart".svg`} />
          <div className={styles.backetItem} />
          <div className={styles.div1}>0</div>
        </div>
      </div>

      {/* Новинки */}
      <b className={styles.b1}>Новинки</b>
      <div className={styles.newBooks}>
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: newPrevRef.current,
            nextEl: newNextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = newPrevRef.current
            swiper.params.navigation.nextEl = newNextRef.current
          }}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {/* Repeat static slides */}
          <SwiperSlide>
            <div className={styles.productCase}>
              <img className={styles.productCaseChild} alt="" src="Rectangle 5.png" />
              <b className={styles.description}>Скиталец. Лживые предания</b>
              <a className={styles.author} href="https://www.chitai-gorod.ru/author/knyaz-anastasiya-21603511" target="_blank">Анастасия Князь</a>
              <div className={styles.div2}>939 ₽</div>
              <div className={styles.productCaseItem} onClick={onProfileClick} />
              <div className={styles.div3}>Купить</div>
              <div className={styles.productCaseInner} />
              <img className={styles.starIcon} alt="" src="Star 1.svg" />
              <img className={styles.productCaseChild1} alt="" src="Star 2.svg" />
              <img className={styles.productCaseChild2} alt="" src="Star 3.svg" />
              <img className={styles.productCaseChild3} alt="" src="Star 4.svg" />
              <img className={styles.productCaseChild4} alt="" src="Star 5.svg" />
            </div>
          </SwiperSlide>
          {/* ...other SwiperSlide entries for each static productCase... */}
        </Swiper>

        <div className={styles.arrows} ref={newPrevRef}>
          <img className={styles.arrowsChild} alt="" src="Vector 1.svg" />
        </div>
        <div className={styles.arrows1} ref={newNextRef}>
          <img className={styles.arrowsItem} alt="" src="Vector 1.svg" />
        </div>
      </div>

      {/* Лучшие из лучших */}
      <b className={styles.b2}>Лучшие из лучших</b>
      <div className={styles.bestOfTheBest}>
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: bestPrevRef.current,
            nextEl: bestNextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = bestPrevRef.current
            swiper.params.navigation.nextEl = bestNextRef.current
          }}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {/* ...static SwiperSlide elements for productCase blocks... */}
        </Swiper>

        <div className={styles.arrows} ref={bestPrevRef}>
          <img className={styles.arrowsChild} alt="" src="Vector 1.svg" />
        </div>
        <div className={styles.arrows1} ref={bestNextRef}>
          <img className={styles.arrowsItem} alt="" src="Vector 1.svg" />
        </div>
      </div>

      {/* Скоро в продаже */}
      <b className={styles.b3}>Скоро в продаже</b>
      <div className={styles.comingSoon}>
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: comingPrevRef.current,
            nextEl: comingNextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = comingPrevRef.current
            swiper.params.navigation.nextEl = comingNextRef.current
          }}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {/* ...static SwiperSlide elements for comingSoon blocks... */}
        </Swiper>

        <div className={styles.arrows} ref={comingPrevRef}>
          <img className={styles.arrowsChild} alt="" src="Vector 1.svg" />
        </div>
        <div className={styles.arrows1} ref={comingNextRef}>
          <img className={styles.arrowsItem} alt="" src="Vector 1.svg" />
        </div>
      </div>
    </div>
  )
}

export default Body
