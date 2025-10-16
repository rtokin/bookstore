import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

export interface CartItem {
  id: number;            
  title: string;        
  author: string;        
  price: number;         
  image: string;         
  quantity: number;     
}


// Ctx-тип: что мы храним и какие функции экспортируем

interface CartContextType {
  items: CartItem[];                                
  totalCount: number;                              
  totalSum: number;                                  
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItemCompletely: (id: number) => void;        
  changeQuantity: (id: number, delta: number) => void;
  clearCart: () => void;          
}


// Создаём контекст с пустым пришлым значением (пока данные ни о чем)

const CartContext = createContext<CartContextType | undefined>(undefined);


export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {

  const [items, setItems] = useState<CartItem[]>([]);

 
  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalSum = items.reduce((acc, item) => acc + item.quantity * item.price, 0);


  const addItem = useCallback(
    (newItem: Omit<CartItem, "quantity">) => {
      setItems((prev) => {
    
        const idx = prev.findIndex((x) => x.id === newItem.id);
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = {
            ...copy[idx],
            quantity: copy[idx].quantity + 1,
          };
          return copy;
        }
    
        return [...prev, { ...newItem, quantity: 1 }];
      });
    },
    [setItems]
  );

  
  const removeItemCompletely = useCallback(
    (id: number) => {
      setItems((prev) => prev.filter((x) => x.id !== id));
    },
    [setItems]
  );


  const changeQuantity = useCallback(
    (id: number, delta: number) => {
      setItems((prev) => {
        return prev
          .map((x) =>
            x.id === id
              ? { ...x, quantity: Math.max(0, x.quantity + delta) }
              : x
          )
          .filter((x) => x.quantity > 0);
      });
    },
    [setItems]
  );


  const clearCart = useCallback(() => {
    setItems([]);
  }, [setItems]);


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

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
