// src/scripts/seedFirestore.ts
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import admin from "firebase-admin";

// 1) __dirname в ESM    
const __dirname = dirname(fileURLToPath(import.meta.url));

// 2) Загрузка и парсинг JSON с понятными ошибками
function loadJson<T = any>(relativePath: string): T {
  const abs = join(__dirname, "..", "..", relativePath);
  let data: string;
  try {
    data = readFileSync(abs, "utf-8");
  } catch (err: any) {
    throw new Error(`Не удалось прочитать "${relativePath}": ${err.message}`);
  }
  try {
    return JSON.parse(data);
  } catch (err: any) {
    throw new Error(`Ошибка парсинга JSON в "${relativePath}": ${err.message}`);
  }
}

// 3) Тип и валидация одной карточки
interface Card {
  id: number;
  image: string;
  title: string;
  author: string;
  price: string;
}
function validateCard(obj: any, idx: number): Card {
  if (typeof obj !== "object" || obj === null) {
    throw new Error(`Запись[${idx}] не объект.`);
  }
  if (typeof obj.id !== "number") {
    throw new Error(`Запись[${idx}].id должно быть числом.`);
  }
  for (const key of ["image", "title", "author", "price"] as const) {
    if (typeof obj[key] !== "string" || !obj[key].trim()) {
      throw new Error(`Запись[${idx}].${key} должно быть непустой строкой.`);
    }
  }
  return obj;
}

// 4) Главная функция seeder
async function main() {
  console.log("🟢 Старт seedFirestore.ts");

  // 4.1) Загружаем ключ сервис-аккаунта
  let svc: any;
  try {
    svc = loadJson("serviceAccountKey.json");
    console.log("✔ serviceAccountKey.json загружен");
  } catch (err: any) {
    console.error("❌", err.message);
    process.exit(1);
  }

  // 4.2) Инициализируем Admin SDK
  try {
    admin.initializeApp({
      credential: admin.credential.cert(svc),
    });
    console.log("✔ Firebase Admin initialized");
  } catch (err: any) {
    console.error("❌ Ошибка инициализации Firebase:", err.message);
    process.exit(1);
  }

  const db = admin.firestore();

  // 4.3) Если вы действительно хотите использовать локальный эмулятор:
  if (process.env.NODE_ENV === "development") {
    db.settings({ host: "localhost:8080", ssl: false });
    console.log("ℹ️ Пишем в эмулятор Firestore (localhost:8080)");
  } else {
    console.log("ℹ️ Пишем в PRODUCTION Firestore");
  }

  // 4.4) Загружаем cards.json — может быть массив или объект с полями
  let raw: any;
  try {
    raw = loadJson("cards.json");
    console.log("✔ cards.json загружен");
  } catch (err: any) {
    console.error("❌", err.message);
    process.exit(1);
  }

  // 4.5) Собираем единый массив карточек
  let flat: any[] = [];
  if (Array.isArray(raw)) {
    flat = raw;
  } else if (typeof raw === "object" && raw !== null) {
    for (const key of Object.keys(raw)) {
      if (Array.isArray(raw[key])) {
        flat.push(...raw[key]);
      } else {
        console.warn(`⚠️ В cards.json поле "${key}" не массив — пропускаем`);
      }
    }
  } else {
    console.error("❌ cards.json должен быть массивом или объектом с массивами");
    process.exit(1);
  }
  console.log(`ℹ️ Всего найдено карточек: ${flat.length}`);

  // 4.6) Валидация и запись
  for (let i = 0; i < flat.length; i++) {
    let card: Card;
    try {
      card = validateCard(flat[i], i);
    } catch (err: any) {
      console.error(`❌ Валидация записи[${i}] провалилась:`, err.message);
      continue;
    }

    try {
      await db.collection("products").doc(String(card.id)).set(card);
      console.log(`✅ Записан product/${card.id}`);
    } catch (err: any) {
      console.error(`❌ Ошибка записи product/${card.id}:`, err.message);
    }
  }

  console.log("🎉 Все операции завершены");
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
