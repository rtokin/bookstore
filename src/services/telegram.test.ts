import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendTelegramMessage } from "./telegram";

describe("telegram.ts service", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("sends correct POST request when response.ok = true", async () => {
    const mockFetch = vi.fn((input, init) =>
      Promise.resolve({
        ok: true,
        status: 200,
        statusText: "OK",
        json: () => Promise.resolve({ ok: true }),
        headers: new Headers(),
        redirected: false,
        type: "cors" as const,
        url: typeof input === "string" ? input : "",
        text: () => Promise.resolve(""),
      })
    );
    vi.stubGlobal("fetch", mockFetch);

    const text = "Test message for Telegram";
    await sendTelegramMessage(text);

    const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    expect(mockFetch).toHaveBeenCalledWith(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
        }),
      }
    );
  });

  it("throws if response.ok = false", async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 400,
        statusText: "Bad Request",
        json: () => Promise.resolve({ description: "TEST ERROR" }),
        headers: new Headers(),
        redirected: false,
        type: "cors" as const,
        url: "",
        text: () => Promise.resolve("TEST ERROR"),
      })
    );
    vi.stubGlobal("fetch", mockFetch);

    await expect(sendTelegramMessage("Should fail")).rejects.toThrow(
      /Telegram API error/
    );
  });
});
