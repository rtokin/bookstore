// src/components/Body.tsx
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { useCart } from "../contexts/CartContext";
import styles from "../styles/Body.module.css";

interface Product {
  id: number;
  image: string;
  title: string;
  author: string;
  price: string;
}

const Body: FunctionComponent = () => {
  const { addItem } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newIndex, setNewIndex] = useState(0);
  const [bestIndex, setBestIndex] = useState(0);
  const [comingIndex, setComingIndex] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const snap = await getDocs(collection(db, "products"));
        setProducts(snap.docs.map(d => d.data() as Product));
      } catch (e: any) {
        console.error(e);
        setError("Не удалось загрузить товары");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const chunk = <T,>(arr: T[], size: number): T[][] => {
    const r: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      r.push(arr.slice(i, i + size));
    }
    return r;
  };

  const newCards = products.filter(p => p.id >= 200);
  const bestCards = products.filter(p => p.id >= 100 && p.id < 200);
  const comingCards = products.filter(p => p.id < 100);

  const sections = [
    { title: "Новинки", groups: chunk(newCards, 4), index: newIndex, setIndex: setNewIndex },
    { title: "Лучшие из лучших", groups: chunk(bestCards, 4), index: bestIndex, setIndex: setBestIndex },
    { title: "Скоро в продаже", groups: chunk(comingCards, 4), index: comingIndex, setIndex: setComingIndex },
  ];

  const buy = useCallback((item: Product) => {
    const price = Number(item.price.replace(/\D/g, ""));
    addItem({ ...item, price });
  }, [addItem]);

  const goPrev = (idx: number, set: React.Dispatch<React.SetStateAction<number>>, groups: any[][]) =>
    set(Math.max(idx - 1, 0));
  const goNext = (idx: number, set: React.Dispatch<React.SetStateAction<number>>, groups: any[][]) =>
    set(Math.min(idx + 1, groups.length - 1));

  if (loading) return <div className={styles.loading}>Загрузка...</div>;
  if (error)   return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.body}>
      <div className={styles.bodyInner}>
        {sections.map(({ title, groups, index, setIndex }) => (
          <section key={title} className={styles.section}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            <div className={styles.carouselWrapper}>
              <button
                className={styles.arrowPrev}
                onClick={() => goPrev(index, setIndex, groups)}
                disabled={index === 0}
              >
                <img src="/images/arrows_left.svg" alt="prev" />
              </button>
              <div className={styles.sliderViewport}>
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={index}
                    className={styles.slideContainer}
                    initial={{ x: index > 0 ? 300 : -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: index > 0 ? -300 : 300, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
                  >
                    {groups[index]?.map(item => (
                      <div key={item.id} className={styles.productCase}>
                        <img
                          className={styles.productPhoto}
                          src={item.image}
                          alt={item.title}
                        />
                        <div className={styles.productInfo}>
                          <b className={styles.description}>{item.title}</b>
                          <div className={styles.author}>{item.author}</div>
                          <div className={styles.priceAndRating}>
                            <div className={styles.price}>{item.price}</div>
                            <div className={styles.stars}>
                              {[1,2,3,4,5].map(i => (
                                <img
                                  key={i}
                                  src={`/images/Star${i}.svg`}
                                  alt="★"
                                />
                              ))}
                            </div>
                          </div>
                          <button
                            className={styles.buyBox}
                            onClick={() => buy(item)}
                          >
                            Купить
                          </button>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
              <button
                className={styles.arrowNext}
                onClick={() => goNext(index, setIndex, groups)}
                disabled={index === groups.length - 1}
              >
                <img src="/images/arrows_right.svg" alt="next" />
              </button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Body;
