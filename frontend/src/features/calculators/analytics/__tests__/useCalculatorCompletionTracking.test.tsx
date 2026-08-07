import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/tracking/google', () => ({
  trackEvent: vi.fn(),
}));

import { trackEvent } from '@/lib/tracking/google';
import type { CalculatorCalculationInput, CalculatorKind } from '../../types/calculator';
import { CALCULATOR_COMPLETION_DEBOUNCE_MS } from '../createCalculatorCompletionTracker';
import { useCalculatorCompletionTracking } from '../useCalculatorCompletionTracking';

function baseNormalizedInput(
  overrides: Partial<CalculatorCalculationInput> = {},
): CalculatorCalculationInput {
  return {
    lengthM: 10,
    widthM: 5,
    depthM: 2,
    materialId: 'native-soil',
    useAdvanced: false,
    workflowKind: 'swell-based',
    swellFactor: 1.2,
    isHalfLoad: false,
    truckCapacityTons: 21.5,
    ...overrides,
  };
}

type Props = Parameters<typeof useCalculatorCompletionTracking>[0];

function baseProps(overrides: Partial<Props> = {}): Props {
  return {
    calculatorType: 'excavation',
    hasResult: true,
    normalizedInput: baseNormalizedInput(),
    materialId: 'native-soil',
    unitSystem: 'metric',
    ...overrides,
  };
}

describe('useCalculatorCompletionTracking', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('does not fire before the debounce window elapses', () => {
    renderHook(() => useCalculatorCompletionTracking(baseProps()));

    act(() => {
      vi.advanceTimersByTime(CALCULATOR_COMPLETION_DEBOUNCE_MS - 100);
    });

    expect(trackEvent).not.toHaveBeenCalled();
  });

  it('fires calculator_completed with only the allowed params after the debounce window', () => {
    renderHook(() => useCalculatorCompletionTracking(baseProps()));

    act(() => {
      vi.advanceTimersByTime(CALCULATOR_COMPLETION_DEBOUNCE_MS);
    });

    expect(trackEvent).toHaveBeenCalledTimes(1);
    expect(trackEvent).toHaveBeenCalledWith('calculator_completed', {
      calculator_type: 'excavation',
      unit_system: 'metric',
      material_type: 'native-soil',
    });
  });

  it('does not fire while there is no valid result', () => {
    renderHook(() =>
      useCalculatorCompletionTracking(
        baseProps({ hasResult: false, normalizedInput: null, materialId: undefined }),
      ),
    );

    act(() => {
      vi.advanceTimersByTime(CALCULATOR_COMPLETION_DEBOUNCE_MS + 500);
    });

    expect(trackEvent).not.toHaveBeenCalled();
  });

  it('collapses rapid re-renders (every keystroke) into a single event', () => {
    const { rerender } = renderHook((props: Props) => useCalculatorCompletionTracking(props), {
      initialProps: baseProps({ normalizedInput: baseNormalizedInput({ lengthM: 1 }) }),
    });

    for (let i = 2; i <= 10; i += 1) {
      act(() => {
        vi.advanceTimersByTime(50);
      });
      rerender(baseProps({ normalizedInput: baseNormalizedInput({ lengthM: i }) }));
    }

    act(() => {
      vi.advanceTimersByTime(CALCULATOR_COMPLETION_DEBOUNCE_MS);
    });

    expect(trackEvent).toHaveBeenCalledTimes(1);
  });

  it('does not fire again for an unchanged result', () => {
    const { rerender } = renderHook((props: Props) => useCalculatorCompletionTracking(props), {
      initialProps: baseProps(),
    });

    act(() => {
      vi.advanceTimersByTime(CALCULATOR_COMPLETION_DEBOUNCE_MS);
    });

    // New object reference, identical values — should NOT count as a change.
    rerender(baseProps({ normalizedInput: baseNormalizedInput() }));

    act(() => {
      vi.advanceTimersByTime(CALCULATOR_COMPLETION_DEBOUNCE_MS);
    });

    expect(trackEvent).toHaveBeenCalledTimes(1);
  });

  it('permits a new event after a meaningful change produces a new stable result', () => {
    const { rerender } = renderHook((props: Props) => useCalculatorCompletionTracking(props), {
      initialProps: baseProps(),
    });

    act(() => {
      vi.advanceTimersByTime(CALCULATOR_COMPLETION_DEBOUNCE_MS);
    });

    rerender(baseProps({ normalizedInput: baseNormalizedInput({ lengthM: 20 }) }));

    act(() => {
      vi.advanceTimersByTime(CALCULATOR_COMPLETION_DEBOUNCE_MS);
    });

    expect(trackEvent).toHaveBeenCalledTimes(2);
  });

  it('never includes raw dimensions, volume, weight, or truckload values', () => {
    renderHook(() => useCalculatorCompletionTracking(baseProps()));

    act(() => {
      vi.advanceTimersByTime(CALCULATOR_COMPLETION_DEBOUNCE_MS);
    });

    const [, params] = vi.mocked(trackEvent).mock.calls[0];
    expect(Object.keys(params ?? {}).sort()).toEqual(
      ['calculator_type', 'material_type', 'unit_system'].sort(),
    );
  });

  it.each(['excavation', 'gravel', 'topsoil'] as const)(
    'works for the %s calculator',
    (kind: CalculatorKind) => {
      renderHook(() => useCalculatorCompletionTracking(baseProps({ calculatorType: kind })));

      act(() => {
        vi.advanceTimersByTime(CALCULATOR_COMPLETION_DEBOUNCE_MS);
      });

      expect(trackEvent).toHaveBeenCalledWith(
        'calculator_completed',
        expect.objectContaining({ calculator_type: kind }),
      );
    },
  );

  it('does not throw when the tracking helper throws', () => {
    vi.mocked(trackEvent).mockImplementation(() => {
      throw new Error('boom');
    });

    renderHook(() => useCalculatorCompletionTracking(baseProps()));

    expect(() => {
      act(() => {
        vi.advanceTimersByTime(CALCULATOR_COMPLETION_DEBOUNCE_MS);
      });
    }).not.toThrow();
  });
});
