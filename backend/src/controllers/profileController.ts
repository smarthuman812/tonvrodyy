import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string,
  {
    auth: {
      persistSession: false,
    },
  },
);

/**
 * Retrieve a user's profile. At present this simply fetches basic user fields.
 *
 * @param userId UUID of the user
 */
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('id, telegram_id, username, avatar_url, wallet, referral_code, created_at')
    .eq('id', userId)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
