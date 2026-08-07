export const CALCULATOR_COMPLETION_DEBOUNCE_MS = 600;

type CreateCalculatorCompletionTrackerOptions<TParams> = {
  onFire: (params: TParams) => void;
  debounceMs?: number;
};

export type CalculatorCompletionTracker<TParams> = {
  /**
   * Call on every new (possibly still-changing) result. Debounces internally
   * — only the last call within the debounce window can actually fire, and
   * only if its signature differs from the last one successfully sent.
   */
  notifyResult: (signature: string, params: TParams) => void;
  /** Clears the pending timer and the dedup memory (e.g. material reset). */
  reset: () => void;
  /** Clears the pending timer without resetting dedup memory (unmount). */
  dispose: () => void;
};

/**
 * Framework-free debounce + duplicate-prevention for calculator_completed.
 * Deliberately has no React/browser dependency so it can be unit tested with
 * fake timers in isolation.
 */
export function createCalculatorCompletionTracker<TParams>({
  onFire,
  debounceMs = CALCULATOR_COMPLETION_DEBOUNCE_MS,
}: CreateCalculatorCompletionTrackerOptions<TParams>): CalculatorCompletionTracker<TParams> {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastSentSignature: string | null = null;

  function clearTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function notifyResult(signature: string, params: TParams) {
    clearTimer();
    timer = setTimeout(() => {
      timer = null;
      if (signature === lastSentSignature) {
        return;
      }
      lastSentSignature = signature;
      onFire(params);
    }, debounceMs);
  }

  function reset() {
    clearTimer();
    lastSentSignature = null;
  }

  function dispose() {
    clearTimer();
  }

  return { notifyResult, reset, dispose };
}
