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
    { id: 201, image: '/images/0195bc88-8a98-7275-afe7-61ec15ac005d.webp', title: 'Скиталец. Лживые предания', author: 'Анастасия Князь', price: '939 ₽' },
    { id: 202, image: '/images/01963a94-8322-78fd-8697-4fa943aa2c42.webp', title: 'Спешащие во тьму', author: 'Адам Нэвилл', price: '845 ₽' },
    { id: 203, image: '/images/01965c27-4974-716a-a4b5-a0a8e66a2f8d.webp', title: 'Комната правды', author: 'Юки Синъитиро', price: '563 ₽' },
    { id: 204, image: '/images/01965c23-cfc5-709a-999a-bc444cc5e03b.webp', title: 'Мармеладные убийства', author: 'Чо Йеын', price: '630 ₽' },
    { id: 205, image: '/images/0195db84-fcb1-7d1e-8bbb-6fa6e631e125.webp', title: 'Проверка на бессмертие', author: 'Мэй', price: '1000 ₽' },
    { id: 206, image: '/images/0195fb53-6604-7454-a80a-102c5bc33824.webp', title: 'Странички шелестят', author: 'Белла Лавгуд', price: '880 ₽' },
    { id: 207, image: '/images/0195fb57-c23f-7955-ab56-6ebb7e4698fa.webp', title: 'Все мои птицы', author: 'К.А.Терина', price: '1020 ₽' },
    { id: 208, image: '/images/0195d843-5795-7123-967d-941e4e87c928.webp', title: 'Падение дома Ашеров', author: 'Жан Дюфо', price: '1150 ₽' },
    { id: 209, image: '/images/019540e7-f91c-7ed4-8466-5dea3bd99e76.webp', title: 'Птицы леса. Артбук', author: 'Geo Saiko', price: '1870 ₽' },
    { id: 210, image: '/images/019391f9-bc9a-7995-84ef-411f6f52de8e.webp', title: 'Всё решено', author: 'Роберт Сапольски', price: '1140 ₽' },
    { id: 211, image: '/images/0196dcb6-4df3-739d-878b-74c029d459ee.webp', title: 'Империя проклятых', author: 'Джей Кристофф', price: '1220 ₽' },
    { id: 212, image: '/images/0196a980-703e-728f-ab31-f6a4df95f0d6.webp', title: 'Странный дом', author: 'Укэцу', price: '690 ₽' },
  ]

  const bestCards = [
    { id: 101, image: '/images/018f5d90-5ff1-7b9b-b002-5ce6472ce5bf.webp', title: 'Кафе на краю земли', author: 'Джон Стрелеки', price: '310 ₽' },
    { id: 102, image: '/images/018ee68f-686f-7a93-a6cf-389fbfe0490e.webp', title: 'Черные кувшинки', author: 'Мишель Бюсси', price: '1080 ₽' },
    { id: 103, image: '/images/0195a59f-5e89-7742-8695-f9c006f651e3.webp', title: 'Берсерк. Том 10', author: 'Кэнтаро Миура', price: '1870 ₽' },
    { id: 104, image: '/images/01966bf4-4011-7197-b5cb-944b4963c97b.webp', title: 'Непокорная ведьма', author: 'Кристен Чиккарелли', price: '1270 ₽' },
    { id: 105, image: '/images/019009e3-c085-77f8-9958-787e3d0f44c6.webp', title: 'День, когда пала ночь', author: 'Саманта Шеннон', price: '1170 ₽' },
    { id: 106, image: '/images/018f5cd4-996a-7b25-a07f-137b11553a7d.webp', title: 'Стеклянный трон', author: 'Сара Маас', price: '920 ₽' },
    { id: 107, image: '/images/01968122-f415-79ad-9a5d-0c250c306aaf.webp', title: 'Приручить 7-го', author: 'Хлоя Уолш', price: '1450 ₽' },
    { id: 108, image: '/images/0196d2ad-0612-7340-9c35-95106a082e49.webp', title: 'Отсюда не возвращаются', author: 'Алла Озорнина', price: '590 ₽' },
    { id: 109, image: '/images/019647b1-5798-7c18-8303-6c85d0d8644f.webp', title: 'Мой первый круиз', author: 'Ася Лавринович', price: '1130 ₽' },
    { id: 110, image: '/images/0191c3b3-d11c-7806-a49d-144182ba7eef.webp', title: 'Кошмарных снов, любимая', author: 'Анна Джейн', price: '730 ₽' },
    { id: 111, image: '/images/01956502-848f-745e-b1bc-94ab3cd50da3.webp', title: 'Неуловимая подача', author: 'Лиз Томфорд', price: '820 ₽' },
    { id: 112, image: '/images/019564ff-427b-7723-99c5-87cbcee568b7.webp', title: 'Азбука воспитания', author: 'Карина Рихтере', price: '790 ₽' },
  ]

  const comingCards = [
    { id: 1, image: '/images/01968837-14f6-793c-ac91-375d4fa65c11.webp', title: 'Леди и Бродяга', author: 'Ксюша Левина', price: '460 ₽' },
    { id: 2, image: '/images/0194612f-6f3e-76f8-b9d9-53b27e4c50b3.webp', title: 'Железное пламя', author: 'Ребекка Яррос', price: '1480 ₽' },
    { id: 3, image: '/images/0194612f-769a-7959-a6c2-ec47fbb2dacf.webp', title: 'Прачечная', author: 'Ким Чжи Юн', price: '770 ₽' },
    { id: 4, image: '/images/018fadf7-19f4-7044-b104-d0260121be9d.webp', title: 'Правда о деле Квеберта', author: 'Жоэль Диккер', price: '1300 ₽' },
    { id: 5, image: '/images/0194612f-bfde-7788-a61e-a344b0ea9d27.webp', title: 'Ресторан 06:06:06', author: 'Пом Ю Джин', price: '770 ₽' },
    { id: 6, image: '/images/0195ced2-984e-7456-ab2e-9c6a38315348.webp', title: 'Станция Лихо', author: 'Надя Сова', price: '727 ₽' },
    { id: 7, image: '/images/0195eff3-5a6e-75a1-97fe-5d1820837da9.webp', title: 'Черный парусник', author: 'Амелия Грэмм', price: '790 ₽' },
    { id: 8, image: '/images/0195fb5f-6b83-75ec-a0a5-71854f9510c8.webp', title: 'Ва-банк', author: 'Дженнифер Линн Барнс', price: '830 ₽' },
    { id: 9, image: '/images/0196238b-040c-72e6-b5db-e2c9a75d8922.webp', title: 'Долина Зерпентштайн', author: 'Ива Беленькая, Александр Левашов', price: '740 ₽' },
    { id: 10, image: '/images/0195fb52-41af-7cd6-a700-27ead36eb161.webp', title: 'Тихоня (#1)', author: 'Дж. Л. Бек', price: '710 ₽' },
    { id: 11, image: '/images/0195cabe-b9fa-7aea-996a-f3268d8d0e52.webp', title: 'Идеальная деревня', author: 'Дж. М. Хьюитт', price: '759 ₽' },
    { id: 12, image: '/images/01959304-d38f-7381-b3cd-0ad0ced06481.webp', title: 'Дело Теней (#1)', author: 'Анастасия Безденежных', price: '570 ₽' },
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

  const newGroups = chunkArray(newCards, 4)
  const bestGroups = chunkArray(bestCards, 4)
  const comingGroups = chunkArray(comingCards, 4)


  // ------------------------------
  // 3) State: индекс текущего слайда в каждой секции
  // ------------------------------
  const [newIndex, setNewIndex] = useState(0)
  const [bestIndex, setBestIndex] = useState(0)
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

        <div className={styles.font}>
          <img className={styles.unsplashrarnGq1sbaIcon} alt="" src="../public/images/unsplash_rarn_gq1SBA.png" />
          <img className={styles.unsplashrarnGq1sbaIcon1} alt="" src="../public/images/unsplash_rarn_gq1SBA.png" />
          <img className={styles.unsplashrarnGq1sbaIcon2} alt="" src="../public/images/unsplash_rarn_gq1SBA.png" />
          <img className={styles.unsplashDank9gjvdyIcon} alt="" src="../public/images/unsplash__dAnK9GJvdY.svg" />
          <img className={styles.unsplashDank9gjvdyIcon1} alt="" src="../public/images/unsplash__dAnK9GJvdY.svg" />
          <img className={styles.unsplashDank9gjvdyIcon2} alt="" src="../public/images/unsplash__dAnK9GJvdY.svg" />
        </div>

        {/* ─────────────────────────────────────────────────────────────────────── */}
        {/* Секция 1: «Новинки»                                                   */}
        {/* ─────────────────────────────────────────────────────────────────────── */}
        <div>
          <b className={styles.sectionTitle}>Новинки</b>
          <div className={styles.carouselWrapper}>

            {/* Стрелка «назад» */}
            <div className={styles.arrowPrev} onClick={handleNewPrev}>
              <img src="/images/arrows_left.svg" alt="prev" />
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
              <img src="/images/arrows_right.svg" alt="next" />
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
              <img src="/images/arrows_left.svg" alt="prev" />
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
              <img src="/images/arrows_right.svg" alt="next" />
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
              <img src="/images/arrows_left.svg" alt="prev" />
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
              <img src="/images/arrows_right.svg" alt="next" />
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Body
