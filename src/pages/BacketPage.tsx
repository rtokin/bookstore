// src/pages/BacketPage.tsx
import React from "react";
import { useCart, CartItem as CartItemType } from "../contexts/CartContext";
import { useNavigate } from "@tanstack/react-router";
import styles from "../styles/BacketPage.module.css";

const BacketPage: React.FC = () => {
  const navigate = useNavigate({ from: "/cart" });
  const { items, changeQuantity, totalSum, clearCart } = useCart();

  // Кнопка «Оформить заказ»
  const onPlaceOrder = () => {
    if (items.length === 0) {
      alert("Корзина пуста!");
      return;
    }
    alert(`Заказ на сумму ${totalSum} ₽ оформлен!`);
    clearCart();
    navigate({ to: "/" });
  };

  return (
    <div className={styles.container}>
      {items.length === 0 ? (
        <div className={styles.emptyMessage}>
          Ваша корзина пуста.
        </div>
      ) : (
        <>
          <ul className={styles.itemsList}>
            {items.map((item: CartItemType) => (
              <li key={item.id} className={styles.itemRow}>
                {/* Обложка */}
                <div className={styles.coverWrapper}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.coverImage}
                  />
                </div>

                {/* Текстовая часть: название + автор */}
                <div className={styles.textWrapper}>
                  <b className={styles.title}>{item.title}</b>
                  <div className={styles.author}>{item.author}</div>
                </div>

                {/* Цена (за всё количество) */}
                <div className={styles.price}>
                  {item.price * item.quantity} ₽
                </div>

                {/* Количество и кнопки */}
                <div className={styles.qtyControl}>
                  <button
                    className={styles.qtyButton}
                    onClick={() => changeQuantity(item.id, -1)}
                    disabled={item.quantity <= 1}
                  >
                    –
                  </button>
                  <span className={styles.qtyValue}>{item.quantity}</span>
                  <button
                    className={styles.qtyButton}
                    onClick={() => changeQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Подвал списка — кнопка «Оформить заказ» */}
          <div className={styles.orderSection}>
            <button
              className={styles.placeOrderButton}
              onClick={onPlaceOrder}
            >
              Оформить заказ ({totalSum} ₽)
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BacketPage;
