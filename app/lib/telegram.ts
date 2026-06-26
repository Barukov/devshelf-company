function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function tg(value: unknown) {
  return escapeHtml(value);
}

export async function sendDesk1TelegramMessage(text: string) {
  const botToken = process.env.TELEGRAM_DESK1_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_DESK1_CHAT_ID;

  if (!botToken || !chatId) {
    console.log("Desk 1 Telegram is not configured");
    return;
  }

  const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    console.error("Desk 1 Telegram send failed:", await res.text());
  }
}
