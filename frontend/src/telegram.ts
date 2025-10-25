/*
 * Telegram WebApp helper functions.
 *
 * In a Telegram Mini App context the Telegram SDK injects a `Telegram` object
 * into the global `window`. This helper safely extracts the current
 * Telegram user from that object if available. When running outside of
 * Telegram (e.g. during development in a regular browser), this helper
 * returns `null`.
 */

export interface TelegramUser {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  allows_write_to_pm?: boolean;
}

export function getTelegramUser(): TelegramUser | null {
  // Use a type cast to `any` so we don't need to import Telegram types.
  const tg: any = (window as any).Telegram?.WebApp?.initDataUnsafe;
  if (!tg?.user) {
    return null;
  }
  return tg.user as TelegramUser;
}