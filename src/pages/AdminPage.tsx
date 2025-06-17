// src/pages/AdminPage.tsx
import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../services/firebase";
import styles from "../styles/AdminPage.module.css";
import { Product } from "../types";

const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Product>>({ section: "new" });

  // 1) Загрузка товаров
  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(collection(db, "products"));
        const docs = snap.docs.map((d) => {
          const data = d.data() as Omit<Product, "docId">;
          return {
            docId: d.id,
            id: data.id,
            title: data.title,
            author: data.author,
            price: data.price,
            image: data.image,
            section: data.section,
          };
        });
        setProducts(docs);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 2) Изменяем форму
  const handleChange = (k: keyof Product, v: string) => {
    setForm((prev) => ({ ...prev, [k]: v }));
  };
  const resetForm = () => setForm({ section: "new" });

  // 3) Сохраняем (добавляем или обновляем)
  const save = async () => {
    try {
      if (!form.title || !form.author || !form.price) {
        alert("Заполните все обязательные поля");
        return;
      }
      if (form.docId) {
        // обновление
        await updateDoc(doc(db, "products", form.docId), {
          id: Number(form.id),
          title: form.title,
          author: form.author,
          price: form.price,
          image: form.image || "",
          section: form.section!,
        });
        alert("Товар обновлён");
      } else {
        // создание
        await addDoc(collection(db, "products"), {
          id: Number(form.id) || Date.now(),
          title: form.title,
          author: form.author,
          price: form.price,
          image: form.image || "",
          section: form.section!,
        });
        alert("Товар добавлен");
      }
      resetForm();
      // перезагрузить список
      const snap2 = await getDocs(collection(db, "products"));
      const docs2 = snap2.docs.map((d) => {
        const data = d.data() as Omit<Product, "docId">;
        return {
          docId: d.id,
          id: data.id,
          title: data.title,
          author: data.author,
          price: data.price,
          image: data.image,
          section: data.section,
        };
      });
      setProducts(docs2);
    } catch (e: any) {
      alert("Ошибка сохранения: " + e.message);
    }
  };

  // 4) Удаление
  const remove = async (docId: string) => {
    if (!window.confirm("Точно удалить?")) return;
    await deleteDoc(doc(db, "products", docId));
    setProducts((p) => p.filter((x) => x.docId !== docId));
  };

  // 5) Заполнить форму для редактирования
  const edit = (p: Product) => {
    setForm({
      docId: p.docId,
      id: p.id,
      title: p.title,
      author: p.author,
      price: p.price,
      image: p.image,
      section: p.section,
    });
  };

  if (loading) return <div className={styles.message}>Загрузка...</div>;
  if (error) return <div className={styles.message}>Ошибка: {error}</div>;

  return (
    <div className={styles.adminPage}>
      <h1 className={styles.title}>Админ-панель</h1>

      <section className={styles.formSection}>
        <h2>{form.docId ? "Редактировать" : "Новый товар"}</h2>
        <input
          placeholder="ID (число)"
          value={form.id ?? ""}
          onChange={(e) => handleChange("id", e.target.value)}
        />
        <input
          placeholder="Заголовок"
          value={form.title ?? ""}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <input
          placeholder="Автор"
          value={form.author ?? ""}
          onChange={(e) => handleChange("author", e.target.value)}
        />
        <input
          placeholder="Цена (например, 500 ₽)"
          value={form.price ?? ""}
          onChange={(e) => handleChange("price", e.target.value)}
        />
        <input
          placeholder="URL картинки"
          value={form.image ?? ""}
          onChange={(e) => handleChange("image", e.target.value)}
        />
        <select
          value={form.section}
          onChange={(e) => handleChange("section", e.target.value)}
        >
          <option value="new">Новинки</option>
          <option value="best">Лучшие</option>
          <option value="coming">Скоро</option>
        </select>
        <button onClick={save}>{form.docId ? "Сохранить" : "Добавить"}</button>
        {form.docId && <button onClick={resetForm}>Отменить</button>}
      </section>

      <section className={styles.listSection}>
        <h2>Список товаров</h2>
        <ul className={styles.list}>
          {products.map((p) => (
            <li key={p.docId} className={styles.item}>
              <span>
                [{p.id}] {p.title}
              </span>
              <div>
                <button onClick={() => edit(p)}>✎</button>
                <button onClick={() => remove(p.docId!)}>🗑</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminPage;
