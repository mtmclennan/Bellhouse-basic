import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/tracking/google', () => ({
  trackEvent: vi.fn(),
}));

import { trackEvent } from '@/lib/tracking/google';
import { useCalculatorStartedTracking } from '../useCalculatorStartedTracking';

describe('useCalculatorStartedTracking', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not fire on initial render or from default values alone', () => {
    renderHook(() => useCalculatorStartedTracking('excavation'));

    expect(trackEvent).not.toHaveBeenCalled();
  });

  it('fires once when markStarted is called', () => {
    const { result } = renderHook(() => useCalculatorStartedTracking('gravel'));

    act(() => {
      result.current.markStarted();
    });

    expect(trackEvent).toHaveBeenCalledTimes(1);
    expect(trackEvent).toHaveBeenCalledWith('calculator_started', {
      calculator_type: 'gravel',
    });
  });

  it('never fires more than once per page session even with repeated changes', () => {
    const { result } = renderHook(() => useCalculatorStartedTracking('topsoil'));

    act(() => {
      result.current.markStarted();
      result.current.markStarted();
      result.current.markStarted();
    });

    expect(trackEvent).toHaveBeenCalledTimes(1);
  });

  it.each(['excavation', 'gravel', 'topsoil'] as const)(
    'reports the correct calculator_type for %s',
    (kind) => {
      const { result } = renderHook(() => useCalculatorStartedTracking(kind));

      act(() => {
        result.current.markStarted();
      });

      expect(trackEvent).toHaveBeenCalledWith('calculator_started', {
        calculator_type: kind,
      });
    },
  );

  it('does not throw when the tracking helper throws', () => {
    vi.mocked(trackEvent).mockImplementation(() => {
      throw new Error('boom');
    });
    const { result } = renderHook(() => useCalculatorStartedTracking('excavation'));

    expect(() => {
      act(() => {
        result.current.markStarted();
      });
    }).not.toThrow();
  });
});
