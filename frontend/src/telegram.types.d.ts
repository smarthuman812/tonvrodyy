export function getTelegramUser() {
  const tg = (window as any).Telegram?.WebApp;
  const user = tg?.initDataUnsafe?.user;

  if (!user) {
    console.warn("⚠️ Telegram user not found — running outside Telegram Mini App.");
    return {
      id: 0,
      username: "guest",
      first_name: "Guest",
      last_name: "",
      photo_url: "https://placehold.co/128x128",
    };
  }

  return user;
}
