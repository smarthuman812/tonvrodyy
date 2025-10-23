import { describe, it, expect } from 'vitest';
import { handleTonEvent } from '../src/controllers/tonController';

describe('handleTonEvent', () => {
  it('should resolve without throwing', async () => {
    await expect(handleTonEvent({ foo: 'bar' })).resolves.toBeUndefined();
  });
});
