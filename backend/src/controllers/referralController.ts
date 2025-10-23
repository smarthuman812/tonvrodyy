import { createClient } from '@supabase/supabase-js';

// Supabase client initialization
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
 * List all direct referrals for a given user. Returns an array of user objects
 * corresponding to the children who used the parent's referral code.
 *
 * @param userId UUID of the parent user
 */
export async function listReferrals(userId: string) {
  const { data, error } = await supabase
    .from('referrals')
    .select('child_id, level, users(child_id:child_id (*))')
    .eq('parent_id', userId);
  if (error) {
    throw new Error(error.message);
  }
  // Map the returned rows to a more convenient shape
  return (
    data?.map((row) => ({
      childId: row.child_id,
      level: row.level,
    })) || []
  );
}
