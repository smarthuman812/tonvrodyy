import { Router } from "express";
import { createClient } from "@supabase/supabase-js";

const router = Router();
const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);


router.post("/", async (req, res) => {
  const { telegram_id, username, avatar, first_name, last_name } = req.body;

  const { data, error } = await supabase
    .from("users")
    .upsert({ telegram_id, username, avatar, first_name, last_name })
    .select();

  if (error) return res.status(500).json({ error });
  res.json(data);
});

export default router;
