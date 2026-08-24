'use client';

import { useCallback, useEffect, useState } from 'react';
import type { CalculatorConfig } from '../config/calculators';
import type { CalculatorFormInput, CalculatorKind } from '../types/calculator';
import {
  buildCalculatorShareUrl,
  readCalculatorShareHash,
} from '../share/calculatorShareState';

type UseCalculatorShareStateParams = {
  kind: CalculatorKind;
  config: CalculatorConfig;
  input: CalculatorFormInput;
  replaceInput: (input: CalculatorFormInput) => void;
};

export function useCalculatorShareState({
  kind,
  config,
  input,
  replaceInput,
}: UseCalculatorShareStateParams) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'ready'>('idle');

  useEffect(() => {
    const restoredInput = readCalculatorShareHash(window.location.hash, kind, config);
    if (restoredInput) replaceInput(restoredInput);
  }, [config, kind, replaceInput]);

  useEffect(() => {
    if (status === 'idle') return;
    const timeout = window.setTimeout(() => setStatus('idle'), 2500);
    return () => window.clearTimeout(timeout);
  }, [status]);

  const shareEstimate = useCallback(async () => {
    const shareUrl = buildCalculatorShareUrl(window.location.href, kind, input);

    try {
      await navigator.clipboard.writeText(shareUrl);
      setStatus('copied');
    } catch {
      window.history.replaceState(null, '', shareUrl);
      setStatus('ready');
    }
  }, [input, kind]);

  return {
    label:
      status === 'copied'
        ? 'Link copied!'
        : status === 'ready'
          ? 'Link ready in address bar'
          : 'Share this estimate',
    isCopied: status === 'copied',
    onClick: shareEstimate,
  };
}
