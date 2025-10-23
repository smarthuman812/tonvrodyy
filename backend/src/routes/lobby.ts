import { Router } from 'express';
import {
  getLobbies,
  createLobby,
  joinLobby,
} from '../controllers/lobbyController';

const router = Router();

// GET /api/lobby
// Returns a list of open lobbies
router.get('/', async (req, res) => {
  try {
    const lobbies = await getLobbies();
    return res.json(lobbies);
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ error: err.message ?? 'Failed to fetch lobbies' });
  }
});

// POST /api/lobby
// Creates a new lobby with provided name and maxPlayers
router.post('/', async (req, res) => {
  try {
    const { name, maxPlayers, creatorId } = req.body;
    if (!name || !maxPlayers || !creatorId) {
      return res.status(400).json({ error: 'name, maxPlayers and creatorId are required' });
    }
    const lobby = await createLobby(name, maxPlayers, creatorId);
    return res.status(201).json(lobby);
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ error: err.message ?? 'Failed to create lobby' });
  }
});

// POST /api/lobby/join
// Join an existing lobby with a stake amount
router.post('/join', async (req, res) => {
  try {
    const { lobbyId, userId, amount } = req.body;
    if (!lobbyId || !userId || amount == null) {
      return res.status(400).json({ error: 'lobbyId, userId and amount are required' });
    }
    const result = await joinLobby(lobbyId, userId, amount);
    return res.status(200).json(result);
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ error: err.message ?? 'Failed to join lobby' });
  }
});

export default router;
