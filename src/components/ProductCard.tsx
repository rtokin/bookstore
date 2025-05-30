import React, { FC } from 'react'
import styles from '../styles/Body.module.css'   
import { ProductCaseItem } from '../types/product-case'

interface Props {
  data: ProductCaseItem
  onBuy: (id: number) => void
}

const ProductCard: FC<Props> = ({ data, onBuy }) => (
  <div className={styles.productCase}>
    {/* Фото книги */}
    <img
      className={styles.ProductPhoto}
      src={`/images/${data.ProductPhoto.src}`}
      alt={data.descriptionOfBook.text}
    />

    {/* Название книги */}
    <b className={styles.descriptionOfBook}>
      {data.descriptionOfBook.text}
    </b>

    {/* Автор (ссылка) */}
    <a
      className={styles.AuthorOfBook}
      href={data.AuthorOfBook.link}
      target="_blank"
      rel="noreferrer"
    >
      {data.AuthorOfBook.text}
    </a>

    {/* Цена */}
    <div className={styles.PriceOfBook}>
      {data.PriceOfBook.text}
    </div>

    {/* Кнопка «Купить» (пустой div по Figma-классу) */}
    <div
      className={styles.BuyBox}
      onClick={() => onBuy(data.id)}
    />

    {/* Надпись «Купить» */}
    <div className={styles.Buy}>Купить</div>

    {/* Контейнер для звёзд (пустой div по Figma-классу) */}
    <div className={styles.starBox} />

    {/* Отрисовка звёзд */}
    {data.stars.map((src, idx) => (
      <img
        key={idx}
        className={styles[`Star ${idx + 1}`]}
        src={`/images/${src}`}
        alt="star"
      />
    ))}
  </div>
)

export default ProductCard