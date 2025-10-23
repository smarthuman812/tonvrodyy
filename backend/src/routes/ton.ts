import { Router } from 'express';
import { handleTonEvent } from '../controllers/tonController';

const router = Router();

// POST /api/ton/events
// Webhook handler for TON Connect events (e.g., transaction confirmations)
router.post('/events', async (req, res) => {
  try {
    const event = req.body;
    await handleTonEvent(event);
    return res.status(200).json({ status: 'received' });
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ error: err.message ?? 'Failed to handle TON event' });
  }
});

export default router;
