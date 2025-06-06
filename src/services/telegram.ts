const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN as string;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID as string;

// Проверка, что токены прочитались (иначе — ошибка на раннем этапе)
if (!BOT_TOKEN) {
  throw new Error("VITE_TELEGRAM_BOT_TOKEN не задан в .env");
}
if (!CHAT_ID) {
  throw new Error("VITE_TELEGRAM_CHAT_ID не задан в .env");
}

/**
 * Формирует и отправляет сообщение в Telegram.
 * @param text — Текст сообщения, который будет отправлен в чат.
 */
export async function sendTelegramMessage(text: string): Promise<void> {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const payload = {
    chat_id: CHAT_ID,
    text,
    parse_mode: "HTML", // Можно использовать HTML- или Markdown-форматирование
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    // В случае ошибки выводим детали
    const errorText = await response.text();
    console.error("Ошибка при отправке в Telegram:", errorText);
    throw new Error(`Telegram API error: ${response.statusText}`);
  }
}
