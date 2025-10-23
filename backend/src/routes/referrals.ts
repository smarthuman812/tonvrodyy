import { Router } from 'express';
import { listReferrals } from '../controllers/referralController';

const router = Router();

// GET /api/referrals?userId=<uuid>
// Returns the children referrals of a given user
router.get('/', async (req, res) => {
  const userId = req.query.userId as string;
  if (!userId) {
    return res.status(400).json({ error: 'userId query parameter is required' });
  }
  try {
    const referrals = await listReferrals(userId);
    return res.json(referrals);
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ error: err.message ?? 'Failed to fetch referrals' });
  }
});

export default router;
