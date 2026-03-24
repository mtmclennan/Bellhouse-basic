import Image from 'next/image';
import type { ReactNode } from 'react';
import SectionWrapper from '@/components/layout/SectionWrapper';
import type { ServiceAreaImage } from '@/lib/serviceAreas';
import classes from './ServiceAreaIntro.module.scss';

type ServiceAreaIntroProps = {
  intro: string[];
  heading?: string;
  children?: ReactNode;
  image?: ServiceAreaImage;
};

export default function ServiceAreaIntro({
  intro,
  heading = 'Local project context',
  children,
  image,
}: ServiceAreaIntroProps) {
  return (
    <SectionWrapper containerClassName={classes.container}>
      <div className={classes.content}>
        <div className={classes.copyBlock}>
          <h2 className={classes.heading}>{heading}</h2>
          <div className={classes.copy}>
            {intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {children}
          </div>
        </div>
        {image ? (
          <div className={classes.media}>
            <div className={classes.imageFrame}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={classes.image}
                sizes="(max-width: 1000px) 100vw, 40vw"
              />
            </div>
          </div>
        ) : null}
      </div>
    </SectionWrapper>
  );
}
