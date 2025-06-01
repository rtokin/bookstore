// src/contexts/CartContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

//
// 1) Определяем структуру одного товара в корзине
//
export interface CartItem {
  id: number;            // идентификатор книги (совпадает с item.id из Body)
  title: string;         // название книги
  author: string;        // автор
  price: number;         // цена в рублях (без "₽")
  image: string;         // путь до обложки (испытуем строку "/images/xxx.webp")
  quantity: number;      // сколько этих книг положено в корзину
}

//
// 2) Ctx-тип: что мы храним и какие функции экспортируем
//
interface CartContextType {
  items: CartItem[];                                 // массив товаров
  totalCount: number;                                // общее число позиций (сумма quantity всех items)
  totalSum: number;                                  // общая сумма (sum(price * quantity))
  addItem: (item: Omit<CartItem, "quantity">) => void;// добавление 1 экз. товара (если в корзине нет, quantity=1, иначе +1)
  removeItemCompletely: (id: number) => void;         // убрать весь объект из корзины
  changeQuantity: (id: number, delta: number) => void;// изменить quantity на delta (±1), если станет ≤0 — убрать товар
  clearCart: () => void;                             // очистить корзину полностью
}

//
// 3) Создаём контекст с пустым пришлым значением (пока данные «ни о чём»)
//
const CartContext = createContext<CartContextType | undefined>(undefined);

//
// 4) Провайдер, который будем оборачивать <App /> (или ближайший родитель), 
//    чтобы все дети могли обращаться к CartContext
//
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // state: массив CartItem
  const [items, setItems] = useState<CartItem[]>([]);

  // 4.1 Вычисляем общее кол-во позиций и сумму через мемоизацию
  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalSum = items.reduce((acc, item) => acc + item.quantity * item.price, 0);

  // 4.2 Функция добавления товара
  const addItem = useCallback(
    (newItem: Omit<CartItem, "quantity">) => {
      setItems((prev) => {
        // Если уже есть в корзине – увеличиваем quantity
        const idx = prev.findIndex((x) => x.id === newItem.id);
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = {
            ...copy[idx],
            quantity: copy[idx].quantity + 1,
          };
          return copy;
        }
        // Если нет — добавляем с quantity = 1
        return [...prev, { ...newItem, quantity: 1 }];
      });
    },
    [setItems]
  );

  // 4.3 Функция удаления всего объекта из корзины
  const removeItemCompletely = useCallback(
    (id: number) => {
      setItems((prev) => prev.filter((x) => x.id !== id));
    },
    [setItems]
  );

  // 4.4 Изменение quantity на ±1
  const changeQuantity = useCallback(
    (id: number, delta: number) => {
      setItems((prev) => {
        return prev
          .map((x) =>
            x.id === id
              ? { ...x, quantity: Math.max(0, x.quantity + delta) }
              : x
          )
          .filter((x) => x.quantity > 0); // если стало 0 — выкидываем из массива
      });
    },
    [setItems]
  );

  // 4.5 Очистить корзину
  const clearCart = useCallback(() => {
    setItems([]);
  }, [setItems]);

  // 4.6 Собираем значение контекста
  const value: CartContextType = {
    items,
    totalCount,
    totalSum,
    addItem,
    removeItemCompletely,
    changeQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

//
// 5) Хук, чтобы удобнее «достать» контекст в любом компоненте
//
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
