// frontend/src/lib/user.ts
export function getUserId(): string {
  const key = "tnrd_user_id";
  let uid = localStorage.getItem(key);
  if (!uid) {
    uid = "user-" + Math.random().toString(36).slice(2, 10);
    localStorage.setItem(key, uid);
  }
  return uid;
}
