import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import LobbyCard from '../components/LobbyCard';

interface Lobby {
  id: string;
  name: string;
  max_players: number;
  prize_pool: number;
  status: string;
  creator_id: string | null;
  created_at: string;
}

/**
 * Lobby page displays all available lobbies and allows creation of new ones.
 */
const LobbyPage: React.FC = () => {
  const [lobbies, setLobbies] = useState<Lobby[]>([]);
  const [name, setName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(2);

  useEffect(() => {
    refreshLobbies();
  }, []);

  const refreshLobbies = async () => {
    try {
      const data = await api.getLobbies();
      setLobbies(data as unknown as Lobby[]);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const handleCreate = async () => {
    try {
      // In a real app you would obtain the creatorId from auth context
      const creatorId = localStorage.getItem('user_id') || '00000000-0000-0000-0000-000000000000';
      await api.createLobby(name, maxPlayers, creatorId);
      setName('');
      refreshLobbies();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Available Lobbies</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Lobby name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max players"
          value={maxPlayers}
          onChange={(e) => setMaxPlayers(parseInt(e.target.value, 10))}
          min={2}
        />
        <button onClick={handleCreate}>Create Lobby</button>
      </div>
      {lobbies.length === 0 && <p>No lobbies found.</p>}
      <div style={{ display: 'grid', gap: '1rem' }}>
        {lobbies.map((lobby) => (
          <LobbyCard key={lobby.id} lobby={lobby} />
        ))}
      </div>
    </div>
  );
};

export default LobbyPage;
