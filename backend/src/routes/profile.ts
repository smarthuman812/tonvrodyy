import { Router } from 'express';
import { getUserProfile } from '../controllers/profileController';

const router = Router();

// GET /api/profile?userId=<uuid>
// Returns the profile for a given user
router.get('/', async (req, res) => {
  const userId = req.query.userId as string;
  if (!userId) {
    return res.status(400).json({ error: 'userId query parameter is required' });
  }
  try {
    const profile = await getUserProfile(userId);
    return res.json(profile);
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ error: err.message ?? 'Failed to fetch profile' });
  }
});

export default router;
