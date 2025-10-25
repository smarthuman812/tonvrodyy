import React, { useState } from 'react';
import { api } from '../lib/api';

interface Lobby {
  id: string;
  name: string;
  max_players: number;
  prize_pool: number;
  status: string;
  creator_id: string | null;
  created_at: string;
}

const LobbyCard: React.FC<{ lobby: Lobby }> = ({ lobby }) => {
  const [joining, setJoining] = useState(false);

  const join = async () => {
    setJoining(true);
    try {
      const userId =
        localStorage.getItem('user_id') ||
        '00000000-0000-0000-0000-000000000000';
      await api.joinLobby(lobby.id, userId, 1);
      alert('Joined lobby successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to join lobby');
    } finally {
      setJoining(false);
    }
  };

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '1rem',
        borderRadius: '6px',
      }}
    >
      <h4>{lobby.name}</h4>
      <p>
        Players: {lobby.max_players} | Prize Pool: {lobby.prize_pool}
      </p>
      <p>Status: {lobby.status}</p>
      <button onClick={join} disabled={joining}>
        {joining ? 'Joining...' : 'Join'}
      </button>
    </div>
  );
};

export default LobbyCard;
