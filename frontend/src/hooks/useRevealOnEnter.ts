'use client';

import { useEffect, useRef, useState } from 'react';

type RevealOnEnterOptions = {
  disabled?: boolean;
  rootMargin?: string;
  threshold?: number;
};

export function useRevealOnEnter<TElement extends HTMLElement>({
  disabled = false,
  rootMargin = '0px 0px -8% 0px',
  threshold = 0.18,
}: RevealOnEnterOptions = {}) {
  const elementRef = useRef<TElement | null>(null);
  const [isVisible, setIsVisible] = useState(disabled);

  useEffect(() => {
    if (disabled) {
      setIsVisible(true);
      return;
    }

    const node = elementRef.current;
    if (!node) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [disabled, rootMargin, threshold]);

  return { elementRef, isVisible };
}
