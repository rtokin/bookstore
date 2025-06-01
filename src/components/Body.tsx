// src/components/Body.tsx

import React, { FunctionComponent, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '../styles/Body.module.css'

/**
 * Компонент «Body» выводит три карусели:
 *   1) «Новинки»
 *   2) «Лучшие из лучших»
 *   3) «Скоро в продаже»
 *
 * Заголовки располагаются строго в этом порядке.
 * Карта данных в каждом массиве по 12 карточек,
 * разбивается на группы по 4 карточки (3 слайда).
 * Анимация перелистывания: Framer Motion, easing «ease-out», duration 0.6s.
 */

const Body: FunctionComponent = () => {
  // ------------------------------
  // 1) Данные для трёх секций (по 12 карточек в каждом)
  // ------------------------------
  const newCards = [
    { id: 201, image: '/images/new_cover1.webp', title: 'Скиталец. Лживые предания',           author: 'Анастасия Князь',        price: '939 ₽'  },
    { id: 202, image: '/images/new_cover2.webp', title: 'Спешащие во тьму',                        author: 'Адам Нэвилл',             price: '845 ₽'  },
    { id: 203, image: '/images/new_cover3.webp', title: 'Комната правды',                          author: 'Юки Синъитиро',           price: '563 ₽'  },
    { id: 204, image: '/images/new_cover4.webp', title: 'Мармеладные убийства в парке Сеула',      author: 'Чо Йеын',                  price: '630 ₽'  },
    { id: 205, image: '/images/new_cover5.webp', title: 'Тишина пустоты',                          author: 'Автор Новинка 5',         price: '720 ₽'  },
    { id: 206, image: '/images/new_cover6.webp', title: 'Алхимик Забвения',                        author: 'Автор Новинка 6',         price: '880 ₽'  },
    { id: 207, image: '/images/new_cover7.webp', title: 'Сердце Ледника',                          author: 'Автор Новинка 7',         price: '1020 ₽' },
    { id: 208, image: '/images/new_cover8.webp', title: 'Танец Теней',                             author: 'Автор Новинка 8',         price: '1150 ₽' },
    { id: 209, image: '/images/new_cover9.webp', title: 'Крик в бездне',                           author: 'Автор Новинка 9',         price: '670 ₽'  },
    { id: 210, image: '/images/new_cover10.webp', title: 'Песнь Волков',                          author: 'Автор Новинка 10',        price: '940 ₽'  },
    { id: 211, image: '/images/new_cover11.webp', title: 'Зов Зари',                              author: 'Автор Новинка 11',        price: '820 ₽'  },
    { id: 212, image: '/images/new_cover12.webp', title: 'Лабиринты Снов',                        author: 'Автор Новинка 12',        price: '990 ₽'  },
  ]

  const bestCards = [
    { id: 101, image: '/images/best_cover1.webp',  title: 'Кафе на краю земли',          author: 'Джон Стрелеки',            price: '310 ₽'  },
    { id: 102, image: '/images/best_cover2.webp',  title: 'Черные кувшинки',             author: 'Мишель Бюсси',             price: '1080 ₽' },
    { id: 103, image: '/images/best_cover3.webp',  title: 'Берсерк. Том 10',             author: 'Кэнтаро Миура',            price: '1870 ₽' },
    { id: 104, image: '/images/best_cover4.webp',  title: 'Непокорная ведьма',          author: 'Кристен Чиккарелли',       price: '1270 ₽' },
    { id: 105, image: '/images/best_cover5.webp',  title: 'Дюна',                       author: 'Фрэнк Герберт',            price: '760 ₽'  },
    { id: 106, image: '/images/best_cover6.webp',  title: '451° по Фаренгейту',         author: 'Рэй Брэдбери',             price: '420 ₽'  },
    { id: 107, image: '/images/best_cover7.webp',  title: 'Властелин колец',            author: 'Дж. Р. Р. Толкин',         price: '1590 ₽' },
    { id: 108, image: '/images/best_cover8.webp',  title: '1984',                       author: 'Джордж Оруэлл',            price: '590 ₽'  },
    { id: 109, image: '/images/best_cover9.webp',  title: 'Мастер и Маргарита',         author: 'Михаил Булгаков',          price: '680 ₽'  },
    { id: 110, image: '/images/best_cover10.webp', title: 'Сто лет одиночества',        author: 'Габриэль Гарсиа Маркес',   price: '730 ₽'  },
    { id: 111, image: '/images/best_cover11.webp', title: 'Убить пересмешника',         author: 'Харпер Ли',                price: '650 ₽'  },
    { id: 112, image: '/images/best_cover12.webp', title: 'Над пропастью во ржи',       author: 'Джером Сэлинджер',         price: '540 ₽'  },
  ]

  const comingCards = [
    { id: 1,  image: '/images/01968837-14f6-793c-ac91-375d4fa65c11.webp',  title: 'Леди и Бродяга',            author: 'Ксюша Левина',            price: '460 ₽'  },
    { id: 2,  image: '/images/0194612f-6f3e-76f8-b9d9-53b27e4c50b3.webp',  title: 'Железное пламя',            author: 'Ребекка Яррос',           price: '1480 ₽' },
    { id: 3,  image: '/images/0194612f-769a-7959-a6c2-ec47fbb2dacf.webp',  title: 'Прачечная',                author: 'Ким Чжи Юн',              price: '770 ₽'  },
    { id: 4,  image: '/images/018fadf7-19f4-7044-b104-d0260121be9d.webp',  title: 'Правда о деле Квеберта',    author: 'Жоэль Диккер',            price: '1300 ₽' },
    { id: 5,  image: '/images/another_cover1.webp',                   title: 'Книга №5',                  author: 'Автор №5',                price: '560 ₽'  },
    { id: 6,  image: '/images/another_cover2.webp',                   title: 'Книга №6',                  author: 'Автор №6',                price: '990 ₽'  },
    { id: 7,  image: '/images/another_cover3.webp',                   title: 'Книга №7',                  author: 'Автор №7',                price: '1200 ₽' },
    { id: 8,  image: '/images/another_cover4.webp',                   title: 'Книга №8',                  author: 'Автор №8',                price: '830 ₽'  },
    { id: 9,  image: '/images/another_cover5.webp',                   title: 'Книга №9',                  author: 'Автор №9',                price: '940 ₽'  },
    { id: 10, image: '/images/another_cover6.webp',                   title: 'Книга №10',                 author: 'Автор №10',               price: '510 ₽'  },
    { id: 11, image: '/images/another_cover7.webp',                   title: 'Книга №11',                 author: 'Автор №11',               price: '1199 ₽' },
    { id: 12, image: '/images/another_cover8.webp',                   title: 'Книга №124444444444',                 author: 'Автор №12',               price: '890 ₽'  },
  ]


  // ------------------------------
  // 2) Хелпер: разбиваем любой массив по 4 элемента (для 3 слайдов)
  // ------------------------------
  function chunkArray<T>(arr: T[], size: number): T[][] {
    const result: T[][] = []
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size))
    }
    return result
  }

  const newGroups    = chunkArray(newCards,    4)
  const bestGroups   = chunkArray(bestCards,   4)
  const comingGroups = chunkArray(comingCards, 4)


  // ------------------------------
  // 3) State: индекс текущего слайда в каждой секции
  // ------------------------------
  const [newIndex,    setNewIndex]    = useState(0)
  const [bestIndex,   setBestIndex]   = useState(0)
  const [comingIndex, setComingIndex] = useState(0)

  const handleNewPrev = () => { setNewIndex(prev => (prev > 0 ? prev - 1 : prev)) }
  const handleNewNext = () => { setNewIndex(prev => (prev < newGroups.length - 1 ? prev + 1 : prev)) }

  const handleBestPrev = () => { setBestIndex(prev => (prev > 0 ? prev - 1 : prev)) }
  const handleBestNext = () => { setBestIndex(prev => (prev < bestGroups.length - 1 ? prev + 1 : prev)) }

  const handleComingPrev = () => { setComingIndex(prev => (prev > 0 ? prev - 1 : prev)) }
  const handleComingNext = () => { setComingIndex(prev => (prev < comingGroups.length - 1 ? prev + 1 : prev)) }


  // ------------------------------
  // 4) Обработчик клика «Купить»
  // ------------------------------
  const onBuyClick = useCallback((id: number) => {
    alert(`Нажата кнопка «Купить» у карточки ID=${id}`)
  }, [])


  return (
    <div className={styles.body}>
      <div className={styles.bodyInner}>
        {/* ─────────────────────────────────────────────────────────────────────── */}
        {/* Секция 1: «Новинки»                                                   */}
        {/* ─────────────────────────────────────────────────────────────────────── */}
        <div>
          <b className={styles.sectionTitle}>Новинки</b>
          <div className={styles.carouselWrapper}>

            {/* Стрелка «назад» */}
            <div className={styles.arrowPrev} onClick={handleNewPrev}>
              <img src="/images/arrow_left.svg" alt="prev" />
            </div>

            {/* Анимированная зона, где «плывут» 4 карточки */}
            <div style={{ overflow: 'hidden', width: '100%' }}>
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={newIndex}
                  className={styles.slideContainer}
                  initial={{ x: newIndex > 0 ? 300 : -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: newIndex > 0 ? -300 : 300, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
                >
                  {newGroups[newIndex].map(item => (
                    <div key={item.id} className={styles.productCase}>
                      <img
                        className={styles.productPhoto}
                        src={item.image}
                        alt={item.title}
                      />
                      <b className={styles.description}>{item.title}</b>
                      <div className={styles.author}>{item.author}</div>
                      <div className={styles.price}>{item.price}</div>
                      <div
                        className={styles.buyBox}
                        onClick={() => onBuyClick(item.id)}
                      />
                      <div className={styles.buyText}>Купить</div>
                      <div className={styles.starBox} />
                      <img className={styles.star1} alt="star" src="/images/Star1.svg" />
                      <img className={styles.star2} alt="star" src="/images/Star2.svg" />
                      <img className={styles.star3} alt="star" src="/images/Star3.svg" />
                      <img className={styles.star4} alt="star" src="/images/Star4.svg" />
                      <img className={styles.star5} alt="star" src="/images/Star5.svg" />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Стрелка «вперёд» */}
            <div className={styles.arrowNext} onClick={handleNewNext}>
              <img src="/images/arrow_right.svg" alt="next" />
            </div>

          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────── */}
        {/* Секция 2: «Лучшие из лучших»                                            */}
        {/* ─────────────────────────────────────────────────────────────────────── */}
        <div>
          <b className={styles.sectionTitle}>Лучшие из лучших</b>
          <div className={styles.carouselWrapper}>

            {/* Стрелка «назад» */}
            <div className={styles.arrowPrev} onClick={handleBestPrev}>
              <img src="/images/arrow_left.svg" alt="prev" />
            </div>

            {/* Контейнер анимации */}
            <div style={{ overflow: 'hidden', width: '100%' }}>
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={bestIndex}
                  className={styles.slideContainer}
                  initial={{ x: bestIndex > 0 ? 300 : -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: bestIndex > 0 ? -300 : 300, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
                >
                  {bestGroups[bestIndex].map(item => (
                    <div key={item.id} className={styles.productCase}>
                      <img
                        className={styles.productPhoto}
                        src={item.image}
                        alt={item.title}
                      />
                      <b className={styles.description}>{item.title}</b>
                      <div className={styles.author}>{item.author}</div>
                      <div className={styles.price}>{item.price}</div>
                      <div
                        className={styles.buyBox}
                        onClick={() => onBuyClick(item.id)}
                      />
                      <div className={styles.buyText}>Купить</div>
                      <div className={styles.starBox} />
                      <img className={styles.star1} alt="star" src="/images/Star1.svg" />
                      <img className={styles.star2} alt="star" src="/images/Star2.svg" />
                      <img className={styles.star3} alt="star" src="/images/Star3.svg" />
                      <img className={styles.star4} alt="star" src="/images/Star4.svg" />
                      <img className={styles.star5} alt="star" src="/images/Star5.svg" />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Стрелка «вперёд» */}
            <div className={styles.arrowNext} onClick={handleBestNext}>
              <img src="/images/arrow_right.svg" alt="next" />
            </div>

          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────── */}
        {/* Секция 3: «Скоро в продаже»                                              */}
        {/* ─────────────────────────────────────────────────────────────────────── */}
        <div>
          <b className={styles.sectionTitle}>Скоро в продаже</b>
          <div className={styles.carouselWrapper}>

            {/* Стрелка «назад» */}
            <div className={styles.arrowPrev} onClick={handleComingPrev}>
              <img src="/images/arrow_left.svg" alt="prev" />
            </div>

            {/* Контейнер анимации */}
            <div style={{ overflow: 'hidden', width: '100%' }}>
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={comingIndex}
                  className={styles.slideContainer}
                  initial={{ x: comingIndex > 0 ? 300 : -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: comingIndex > 0 ? -300 : 300, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
                >
                  {comingGroups[comingIndex].map(item => (
                    <div key={item.id} className={styles.productCase}>
                      <img
                        className={styles.productPhoto}
                        src={item.image}
                        alt={item.title}
                      />
                      <b className={styles.description}>{item.title}</b>
                      <div className={styles.author}>{item.author}</div>
                      <div className={styles.price}>{item.price}</div>
                      <div
                        className={styles.buyBox}
                        onClick={() => onBuyClick(item.id)}
                      />
                      <div className={styles.buyText}>Купить</div>
                      <div className={styles.starBox} />
                      <img className={styles.star1} alt="star" src="/images/Star1.svg" />
                      <img className={styles.star2} alt="star" src="/images/Star2.svg" />
                      <img className={styles.star3} alt="star" src="/images/Star3.svg" />
                      <img className={styles.star4} alt="star" src="/images/Star4.svg" />
                      <img className={styles.star5} alt="star" src="/images/Star5.svg" />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Стрелка «вперёд» */}
            <div className={styles.arrowNext} onClick={handleComingNext}>
              <img src="/images/arrow_right.svg" alt="next" />
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Body
