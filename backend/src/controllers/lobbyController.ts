import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
// инициализация supabase...
export async function getLobbies() { /* ... */ }
export async function createLobby(name: string, maxPlayers: number, creatorId: string) { /* ... */ }
export async function joinLobby(lobbyId: string, userId: string, amount: number) { /* ... */ }
