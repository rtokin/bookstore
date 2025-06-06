import React, { FunctionComponent, useState, useCallback } from "react";
import styles from "../styles/OrderModal.module.css";
import { sendTelegramMessage } from "../services/telegram";
import { useCart, CartItem as CartItemType } from "../contexts/CartContext";

interface OrderModalProps {
  onClose: () => void;
}

const OrderModal: FunctionComponent<OrderModalProps> = ({ onClose }) => {
  // Достаём из контекста корзины все позиции и общую сумму
  const { items, totalSum, clearCart } = useCart();

  // Состояния для полей заказа
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      // Простая валидация обязательных полей
      if (!lastName || !firstName || !address || !phone) {
        setError("Пожалуйста, заполните все обязательные поля.");
        return;
      }

      // Формируем текст сообщения (HTML) с деталями заказа
      const customerInfo = `
<b>📦 Новый заказ из StreetBook</b>
<b>Фамилия:</b> ${lastName}
<b>Имя:</b> ${firstName}
<b>Отчество:</b> ${patronymic || "(не указано)"}
<b>Адрес доставки:</b> ${address}
<b>Телефон:</b> ${phone}
<b>Способ оплаты:</b> ${paymentMethod === "cash" ? "Наличными" : "Картой"}
<b>───────────────</b>
`;

      // Список товаров
      let itemsText = `<b>📚 Список товаров:</b>\n`;
      items.forEach((item: CartItemType, idx: number) => {
        const lineTotal = item.price * item.quantity;
        itemsText += `
${idx + 1}. <b>${item.title}</b>
    Автор: ${item.author}
    Цена за шт.: ${item.price} ₽
    Кол-во: ${item.quantity}
    Сумма: ${lineTotal} ₽
`;
      });

      // Итоговая сумма
      const footer = `\n<b>───────────────</b>
<b>Итоговая сумма заказа:</b> ${totalSum} ₽
`;

      const fullMessage = customerInfo + itemsText + footer;

      try {
        setLoading(true);
        await sendTelegramMessage(fullMessage);
        alert("Заказ успешно отправлен! Спасибо за покупку.");
        clearCart();
        onClose();
      } catch (err: any) {
        console.error("Telegram send error:", err);
        setError("Ошибка при отправке заказа. Попробуйте еще раз.");
      } finally {
        setLoading(false);
      }
    },
    [
      lastName,
      firstName,
      patronymic,
      address,
      phone,
      paymentMethod,
      items,
      totalSum,
      clearCart,
      onClose,
    ]
  );

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.title}>Оформление заказа</h2>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Фамилия */}
          <div className={styles.field}>
            <label htmlFor="lastName" className={styles.label}>
              Фамилия *
            </label>
            <input
              id="lastName"
              type="text"
              className={styles.input}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          {/* Имя */}
          <div className={styles.field}>
            <label htmlFor="firstName" className={styles.label}>
              Имя *
            </label>
            <input
              id="firstName"
              type="text"
              className={styles.input}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          {/* Отчество */}
          <div className={styles.field}>
            <label htmlFor="patronymic" className={styles.label}>
              Отчество
            </label>
            <input
              id="patronymic"
              type="text"
              className={styles.input}
              value={patronymic}
              onChange={(e) => setPatronymic(e.target.value)}
            />
          </div>

          {/* Адрес доставки */}
          <div className={styles.field}>
            <label htmlFor="address" className={styles.label}>
              Адрес доставки *
            </label>
            <input
              id="address"
              type="text"
              className={styles.input}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* Телефон */}
          <div className={styles.field}>
            <label htmlFor="phone" className={styles.label}>
              Телефон *
            </label>
            <input
              id="phone"
              type="tel"
              className={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Способ оплаты */}
          <div className={styles.field}>
            <label className={styles.label}>Способ оплаты</label>
            <select
              className={styles.input}
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(e.target.value as "cash" | "card")
              }
            >
              <option value="cash">Наличными</option>
              <option value="card" disabled>
                Безналичный расчет (временно недоступен)
              </option>
            </select>
          </div>

          {/* Кнопка «Отправить заказ» */}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Отправка..." : "Отправить заказ"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
