import { Router } from 'express';
import { handleTelegramAuth } from '../controllers/authController';

const router = Router();

/**
 * POST /api/auth/telegram
 *
 * This endpoint verifies the Telegram WebApp signature and either creates a new user
 * or returns an existing user. It expects `initData` as part of the request body.
 */
router.post('/telegram', async (req, res) => {
  try {
    const { initData } = req.body;
    if (!initData) {
      return res.status(400).json({ error: 'initData is required' });
    }
    const result = await handleTelegramAuth(initData);
    return res.status(200).json(result);
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ error: err.message ?? 'Internal server error' });
  }
});

export default router;
