import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string,
  { auth: { persistSession: false } }
);

// Получить все открытые лобби
export async function getLobbies() {
  const { data, error } = await supabase.from('lobbies').select('*').eq('status', 'open');
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Создать лобби
export async function createLobby(name: string, maxPlayers: number, creatorId: string) {
  const { data, error } = await supabase
    .from('lobbies')
    .insert({ name, max_players: maxPlayers, creator_id: creatorId })
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Присоединиться к лобби: добавляем участника и увеличиваем prize_pool
export async function joinLobby(lobbyId: string, userId: string, amount: number) {
  // Проверяем текущее лобби
  const { data: lobby, error: fetchError } = await supabase
    .from('lobbies')
    .select('*')
    .eq('id', lobbyId)
    .single();
  if (fetchError) {
    throw new Error(fetchError.message);
  }
  // Добавляем запись в lobby_participants
  const { error: insertError } = await supabase
    .from('lobby_participants')
    .insert({ lobby_id: lobbyId, user_id: userId, amount });
  if (insertError) {
    throw new Error(insertError.message);
  }
  // Обновляем общий prize_pool
  const newPrizePool = (lobby?.prize_pool || 0) + amount;
  const { data: updatedLobby, error: updateError } = await supabase
    .from('lobbies')
    .update({ prize_pool: newPrizePool })
    .eq('id', lobbyId)
    .select()
    .single();
  if (updateError) {
    throw new Error(updateError.message);
  }
  return updatedLobby;
}
