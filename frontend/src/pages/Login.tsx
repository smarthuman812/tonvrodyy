import { useEffect, useState } from "react";

export default function Login() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    tg?.ready();

    const telegramUser = tg?.initDataUnsafe?.user;
    if (telegramUser) {
      setUser(telegramUser);

      fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telegram_id: telegramUser.id,
          username: telegramUser.username,
          avatar: telegramUser.photo_url,
          first_name: telegramUser.first_name,
          last_name: telegramUser.last_name,
        }),
      });
    }
  }, []);

  if (!user) return <div>Авторизация через Telegram...</div>;

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <img
        src={user.photo_url}
        alt="Avatar"
        width={100}
        height={100}
        style={{ borderRadius: "50%" }}
      />
      <h2>Привет, {user.first_name}!</h2>
      <p>@{user.username}</p>
    </div>
  );
}
