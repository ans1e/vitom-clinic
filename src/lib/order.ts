import type { CartItem } from "@/store/cart";

/** Telegram account that receives orders (used as both username and profile). */
const TELEGRAM_USER = "vitom_uz";

const priceFormatter = new Intl.NumberFormat("ru-RU");

/**
 * Builds the pre-filled order message sent to the shop's Telegram. Each cart
 * item already carries its flavour and volume in `name`
 * (e.g. "Коллаген желе — Смородина, 650 г"), so the draft reads naturally for
 * any cart — one item or many, shots, jelly, or a mix.
 */
export function buildOrderDraft(items: CartItem[]): string {
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const lines = items.map((i) => `• ${i.name} — ${i.quantity} шт.`);

  return [
    "Здравствуйте! Хочу оформить заказ в VITOM CLINIC:",
    "",
    ...lines,
    "",
    `Итого: ${priceFormatter.format(total)} сум`,
    "",
    "Подскажите, пожалуйста, по доставке и оплате.",
  ].join("\n");
}

/** Telegram deep link that opens a chat with the order draft pre-filled. */
export function buildOrderTelegramUrl(items: CartItem[]): string {
  const text = encodeURIComponent(buildOrderDraft(items));
  return `https://t.me/${TELEGRAM_USER}?text=${text}&${TELEGRAM_USER}`;
}
