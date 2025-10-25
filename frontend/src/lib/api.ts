const BASE_URL = import.meta.env.VITE_PUBLIC_BACKEND_URL as string;

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Request failed');
  }
  return response.json() as Promise<T>;
}

export const api = {
  getLobbies: () => request('/api/lobby'),
  createLobby: (
    name: string,
    maxPlayers: number,
    creatorId: string,
  ) =>
    request('/api/lobby', {
      method: 'POST',
      body: JSON.stringify({ name, maxPlayers, creatorId }),
    }),
  joinLobby: (
    lobbyId: string,
    userId: string,
    amount: number,
  ) =>
    request('/api/lobby/join', {
      method: 'POST',
      body: JSON.stringify({ lobbyId, userId, amount }),
    }),
  getReferrals: (userId: string) =>
    request(`/api/referrals?userId=${userId}`),
  getProfile: (userId: string) =>
    request(`/api/profile?userId=${userId}`),
};
