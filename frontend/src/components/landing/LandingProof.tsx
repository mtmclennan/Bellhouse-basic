import Image from 'next/image';
import type { LandingPageData } from '@/data/landingPages/types';
import LandingSectionHeading from './LandingSectionHeading';

type LandingProofProps = {
  proof?: LandingPageData['proof'];
};

export default function LandingProof({ proof }: LandingProofProps) {
  if (!proof) return null;

  return (
    <section className="landing-section landing-section--dark landing-proof">
      <LandingSectionHeading
        eyebrow={proof.eyebrow}
        heading={proof.heading}
        intro={proof.intro}
      />
      {proof.stats?.length ? (
        <div className="landing-card-grid">
          {proof.stats.map((stat) => (
            <article key={`${stat.value}-${stat.label}`}>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </article>
          ))}
        </div>
      ) : null}
      {proof.gallery?.length ? (
        <div className="landing-gallery">
          {proof.gallery.map((image) => (
            <figure key={image.src}>
              <div className="landing-gallery__image">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 699px) 100vw, (max-width: 1000px) 50vw, 33vw"
                />
              </div>
              {image.caption ? <figcaption>{image.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      ) : null}
    </section>
  );
}
