export interface Participant {
  userId: string;
  weight: number;
}

/**
 * Selects a winner from a list of participants using weighted random selection. A participant's
 * weight represents their chance to win relative to the sum of all weights. Participants
 * with zero weight will never be selected.
 *
 * @param participants Array of participants with associated weights
 */
export function selectWinner(participants: Participant[]): Participant {
  const total = participants.reduce((sum, p) => sum + Math.max(0, p.weight), 0);
  if (total <= 0 || participants.length === 0) {
    throw new Error('No participants with positive weight');
  }
  const threshold = Math.random() * total;
  let cumulative = 0;
  for (const participant of participants) {
    cumulative += Math.max(0, participant.weight);
    if (threshold <= cumulative) {
      return participant;
    }
  }
  // Fallback: return last participant
  return participants[participants.length - 1];
}