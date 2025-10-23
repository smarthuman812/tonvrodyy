import { createHmac } from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Initialize a Supabase client using service-level key. Do not persist sessions.
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
 * Verify Telegram WebApp initData signature and upsert user into the database.
 * Optionally creates a referral entry if a start_param is provided.
 *
 * @param initData The serialized query string provided by Telegram WebApp
 * @returns The user record from the database
 */
export async function handleTelegramAuth(initData: string) {
  // Parse the query string into an object
  const params = new URLSearchParams(initData);
  const data: Record<string, string> = {};
  params.forEach((value, key) => {
    data[key] = value;
  });

  const providedHash = data.hash;
  if (!providedHash) {
    throw new Error('Missing hash parameter');
  }
  delete data.hash;

  // Sort the remaining keys and build the check string
  const checkString = Object.keys(data)
    .sort()
    .map((key) => `${key}=${data[key]}`)
    .join('\n');

  // Compute the secret key and the HMAC as per Telegram docs
  const secret = process.env.TELEGRAM_INIT_SECRET || '';
  const secretKey = createHmac('sha256', 'WebAppData').update(secret).digest();
  const computedHash = createHmac('sha256', secretKey).update(checkString).digest('hex');

  // Compare the hashes to ensure integrity
  if (computedHash !== providedHash) {
    throw new Error('Invalid Telegram init data');
  }

  // Parse the embedded user payload
  const userPayload = data.user ? JSON.parse(data.user) : null;
  if (!userPayload) {
    throw new Error('User payload not found in initData');
  }
  const telegramId: number = userPayload.id;
  const username: string = userPayload.username || '';
  const avatarUrl: string = userPayload.photo_url || '';

  // Upsert user based on telegram_id
  const { data: existing, error: selectError } = await supabase
    .from('users')
    .select('*')
    .eq('telegram_id', telegramId)
    .maybeSingle();
  if (selectError) {
    throw new Error(selectError.message);
  }

  let user = existing;
  if (!user) {
    // Generate a simple referral code
    const referralCode = Math.random().toString(36).substring(2, 8);
    const { data: inserted, error: insertError } = await supabase
      .from('users')
      .insert({
        telegram_id: telegramId,
        username,
        avatar_url: avatarUrl,
        referral_code: referralCode,
      })
      .select()
      .single();
    if (insertError) {
      throw new Error(insertError.message);
    }
    user = inserted;

    // If there is a start_param, assume it's a referral code and create a referral entry
    const refCode = data.start_param;
    if (refCode) {
      // Find parent user by referral code
      const { data: parent, error: parentError } = await supabase
        .from('users')
        .select('id')
        .eq('referral_code', refCode)
        .maybeSingle();
      if (parentError) {
        throw new Error(parentError.message);
      }
      if (parent && parent.id) {
        await supabase.from('referrals').insert({
          parent_id: parent.id,
          child_id: user.id,
          level: 1,
        });
      }
    }
  }

  return user;
}
