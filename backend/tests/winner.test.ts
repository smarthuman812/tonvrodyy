import { describe, it, expect } from 'vitest';
import { selectWinner, Participant } from '../src/utils/winnerSelection';

describe('selectWinner', () => {
  it('should select a participant based on weight', () => {
    const participants: Participant[] = [
      { userId: 'a', weight: 10 },
      { userId: 'b', weight: 0 },
      { userId: 'c', weight: 5 },
    ];
    // Running the selection many times should never select a zero-weight participant
    const picks = new Set<string>();
    for (let i = 0; i < 100; i++) {
      const winner = selectWinner(participants);
      picks.add(winner.userId);
    }
    expect(picks.has('b')).toBe(false);
    expect(picks.has('a')).toBe(true);
    expect(picks.has('c')).toBe(true);
  });
});
