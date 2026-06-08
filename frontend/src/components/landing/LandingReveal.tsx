'use client';

import { useEffect, useRef, useState } from 'react';

type LandingRevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'article' | 'aside' | 'section';
};

export default function LandingReveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: LandingRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const revealClass = `landing-reveal${visible ? ' landing-reveal--in' : ''}${className ? ` ${className}` : ''}`;
  const style = delay ? { transitionDelay: `${delay}s` } : undefined;

  // Narrow tag list avoids the TS union-too-complex error while keeping semantic flexibility.
  const r = ref as unknown as React.RefObject<HTMLDivElement>;
  if (Tag === 'article') return <article ref={r} className={revealClass} style={style}>{children}</article>;
  if (Tag === 'aside') return <aside ref={r} className={revealClass} style={style}>{children}</aside>;
  if (Tag === 'section') return <section ref={r} className={revealClass} style={style}>{children}</section>;
return <div ref={r} className={revealClass} style={style}>{children}</div>;
}
