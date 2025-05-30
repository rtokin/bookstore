import * as React from 'react';
import { FunctionComponent, useCallback, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import styles from './Body.module.css'

// Данные секции "Новинки" в формате Figma export
const newBooks = [
  {
    id: 1,
    title: 'Скиталец. Лживые предания',
    author: 'Анастасия Князь',
    authorLink: 'https://www.chitai-gorod.ru/author/knyaz-anastasiya-21603511',
    price: '939 ₽',
    image: 'Rectangle 5.png',
    stars: ['Star 1.svg','Star 2.svg','Star 3.svg','Star 4.svg','Star 5.svg'],
  },
  {
    id: 2,
    title: 'Спешащие во тьму',
    author: 'Адам Нэвилл',
    authorLink: 'https://www.chitai-gorod.ru/author/nevill-adam-392651',
    price: '845 ₽',
    image: 'Rectangle 5.png',
    stars: ['Star 1.svg','Star 2.svg','Star 3.svg','Star 4.svg','Star 5.svg'],
  },
  {
    id: 3,
    title: 'Комната правды',
    author: 'Юки Синъитиро',
    authorLink: 'https://www.chitai-gorod.ru/author/sinitiro-uki-30052784',
    price: '563 ₽',
    image: 'Rectangle 5.png',
    stars: ['Star 1.svg','Star 2.svg','Star 3.svg','Star 4.svg','Star 5.svg'],
  },
  {
    id: 4,
    title: 'Мармеладные убийства в парке Сеула',
    author: 'Чо Йеын',
    authorLink: 'https://www.chitai-gorod.ru/author/jeyn-co-30050515',
    price: '630 ₽',
    image: 'Rectangle 5.png',
    stars: ['Star 1.svg','Star 2.svg','Star 3.svg','Star 4.svg','Star 5.svg'],
  },
]

const Body: FunctionComponent = () => {
  const onProfileClick = useCallback(() => {
    // Обработчик клика, например, открыть профиль
  }, [])

  // Навигационные стрелки Swiper
  const prevRef = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLDivElement>(null)

  return (
    <div className={styles.body}>
      {/* Фоновая группа из Figma */}
      <div className={styles.font}>
        <img className={styles.unsplashrarnGq1sbaIcon} alt="" src="unsplash:rarn_gq1SBA.png" />
        {/* ... остальные background img ... */}
      </div>

      {/* Navbar из Figma */}
      <div className={styles.navbar}>
        <img className={styles.profileIcon} alt="" src="profile.svg" onClick={onProfileClick} />
        <div className={styles.searchbar}>
          <img className={styles.iconMagnifyingGlass} alt="" src="🦆 icon \"magnifying glass\".svg" />
          <div className={styles.div}>Поиск</div>
        </div>
        <div className={styles.logo}>
          <img className={styles.logoIcon} alt="" src="Logo.svg" />
          <b className={styles.streetbook}>StreetBook</b>
          <b className={styles.b}>Магазин современной литературы</b>
        </div>
        <div className={styles.backet} onClick={onProfileClick}>
          <img className={styles.backetChild} alt="" src="Rectangle 4.svg" />
          <img className={styles.iconCart} alt="" src="🦆 icon \"cart\".svg" />
          <div className={styles.backetItem} />
          <div className={styles.div1}>0</div>
        </div>
      </div>

      {/* Секция "Новинки" */}
      <b className={styles.b1}>Новинки</b>
      <div className={styles.newBooks}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={56}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            640: { slidesPerView: 2, spaceBetween: 36 },
            1024: { slidesPerView: 3, spaceBetween: 56 },
            1280: { slidesPerView: 4, spaceBetween: 56 },
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            if (!swiper.params.navigation) return
            swiper.params.navigation.prevEl = prevRef.current!
            swiper.params.navigation.nextEl = nextRef.current!
          }}
        >
          {newBooks.map((book) => (
            <SwiperSlide key={book.id}>
              <div className={styles.productCase}>
                <img className={styles.productCaseChild} alt="" src={book.image} />
                <b className={styles.description}>{book.title}</b>
                <a className={styles.author} href={book.authorLink} target="_blank" rel="noreferrer">
                  {book.author}
                </a>
                <div className={styles.div2}>{book.price}</div>
                <div className={styles.productCaseItem} onClick={onProfileClick} />
                <div className={styles.div3}>Купить</div>
                <div className={styles.productCaseInner} />
                {book.stars.map((src, i) => (
                  <img key={i} className={styles.starIcon} alt="" src={src} />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Стрелки навигации */}
        <div className={styles.arrows} ref={prevRef}>
          <img className={styles.arrowsChild} alt="" src="Vector 1.svg" />
        </div>
        <div className={styles.arrows1} ref={nextRef}>
          <img className={styles.arrowsItem} alt="" src="Vector 1.svg" />
        </div>
      </div>

      {/* Далее: "Лучшие из лучших" и "Скоро в продаже" повторяют аналогичную обёртку */}
    </div>
  )
}

export default Body
