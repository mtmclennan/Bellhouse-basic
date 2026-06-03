import type { LandingPageData } from '@/data/landingPages/types';

type LandingTrustBarProps = {
  trustBar?: LandingPageData['trustBar'];
};

export default function LandingTrustBar({ trustBar }: LandingTrustBarProps) {
  if (!trustBar) return null;

  return (
    <section className="landing-trust-bar" aria-label="Bellhouse trust details">
      {trustBar.items.map((item) => (
        <span key={`${item.value ?? ''}${item.label}`}>
          {item.value ? <strong>{item.value}</strong> : null}
          {item.label}
        </span>
      ))}
    </section>
  );
}
