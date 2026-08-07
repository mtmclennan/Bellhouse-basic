import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  CALCULATOR_COMPLETION_DEBOUNCE_MS,
  createCalculatorCompletionTracker,
} from '../createCalculatorCompletionTracker';

describe('createCalculatorCompletionTracker', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('does not fire before the debounce window elapses', () => {
    const onFire = vi.fn();
    const tracker = createCalculatorCompletionTracker<{ n: number }>({ onFire });

    tracker.notifyResult('sig-a', { n: 1 });
    vi.advanceTimersByTime(CALCULATOR_COMPLETION_DEBOUNCE_MS - 50);

    expect(onFire).not.toHaveBeenCalled();
  });

  it('fires once after the debounce window elapses', () => {
    const onFire = vi.fn();
    const tracker = createCalculatorCompletionTracker<{ n: number }>({ onFire });

    tracker.notifyResult('sig-a', { n: 1 });
    vi.advanceTimersByTime(CALCULATOR_COMPLETION_DEBOUNCE_MS);

    expect(onFire).toHaveBeenCalledTimes(1);
    expect(onFire).toHaveBeenCalledWith({ n: 1 });
  });

  it('collapses rapid repeated calls (every keystroke) into a single fire', () => {
    const onFire = vi.fn();
    const tracker = createCalculatorCompletionTracker<{ n: number }>({ onFire });

    for (let i = 0; i < 10; i += 1) {
      tracker.notifyResult('sig-a', { n: i });
      vi.advanceTimersByTime(50); // well under the debounce window
    }
    vi.advanceTimersByTime(CALCULATOR_COMPLETION_DEBOUNCE_MS);

    expect(onFire).toHaveBeenCalledTimes(1);
    expect(onFire).toHaveBeenCalledWith({ n: 9 });
  });

  it('does not fire again for an unchanged signature', () => {
    const onFire = vi.fn();
    const tracker = createCalculatorCompletionTracker<{ n: number }>({ onFire });

    tracker.notifyResult('sig-a', { n: 1 });
    vi.advanceTimersByTime(CALCULATOR_COMPLETION_DEBOUNCE_MS);
    tracker.notifyResult('sig-a', { n: 1 });
    vi.advanceTimersByTime(CALCULATOR_COMPLETION_DEBOUNCE_MS);

    expect(onFire).toHaveBeenCalledTimes(1);
  });

  it('permits a new event after a meaningful change produces a new stable signature', () => {
    const onFire = vi.fn();
    const tracker = createCalculatorCompletionTracker<{ n: number }>({ onFire });

    tracker.notifyResult('sig-a', { n: 1 });
    vi.advanceTimersByTime(CALCULATOR_COMPLETION_DEBOUNCE_MS);
    tracker.notifyResult('sig-b', { n: 2 });
    vi.advanceTimersByTime(CALCULATOR_COMPLETION_DEBOUNCE_MS);

    expect(onFire).toHaveBeenCalledTimes(2);
  });

  it('reset() clears dedup memory so the same signature can fire again', () => {
    const onFire = vi.fn();
    const tracker = createCalculatorCompletionTracker<{ n: number }>({ onFire });

    tracker.notifyResult('sig-a', { n: 1 });
    vi.advanceTimersByTime(CALCULATOR_COMPLETION_DEBOUNCE_MS);
    tracker.reset();
    tracker.notifyResult('sig-a', { n: 1 });
    vi.advanceTimersByTime(CALCULATOR_COMPLETION_DEBOUNCE_MS);

    expect(onFire).toHaveBeenCalledTimes(2);
  });

  it('dispose() cancels a pending timer', () => {
    const onFire = vi.fn();
    const tracker = createCalculatorCompletionTracker<{ n: number }>({ onFire });

    tracker.notifyResult('sig-a', { n: 1 });
    tracker.dispose();
    vi.advanceTimersByTime(CALCULATOR_COMPLETION_DEBOUNCE_MS + 100);

    expect(onFire).not.toHaveBeenCalled();
  });
});
