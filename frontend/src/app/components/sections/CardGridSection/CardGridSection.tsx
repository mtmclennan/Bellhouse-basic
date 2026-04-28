import { CheckCircle } from '@phosphor-icons/react/dist/ssr';

import SectionWrapper from '@/components/layout/SectionWrapper';
import type { CardGridSectionData } from '@/types/sections';
import classes from './CardGridSection.module.scss';

type CardGridSectionProps = {
  data: CardGridSectionData;
  containerSize?: 'default' | 'wide';
};

const variantClassMap = {
  light: classes.variantLight,
  dark: classes.variantDark,
  transparent: classes.variantTransparent,
};

const toneClassMap = {
  default: classes.toneDefault,
  soft: classes.toneSoft,
  muted: classes.toneMuted,
};

export default function CardGridSection({
  data,
  containerSize = 'default',
}: CardGridSectionProps) {
  const {
    eyebrow,
    heading,
    subtext,
    cards,
    backgroundVariant = 'transparent',
    backgroundTone = 'default',
    density = 'default',
    headingAlign = 'center',
    layoutStyle = 'default',
  } = data;

  const sectionClassName = [
    classes.section,
    variantClassMap[backgroundVariant],
    toneClassMap[backgroundTone],
    layoutStyle === 'proof' ? classes.layoutProof : '',
    layoutStyle === 'fit' ? classes.layoutFit : '',
  ]
    .filter(Boolean)
    .join(' ');

  const spacingByDensity = {
    compact: '4',
    default: '6',
    relaxed: '8',
  } as const;

  const shellClassName = [
    classes.shell,
    containerSize === 'wide' ? classes.shellWide : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <SectionWrapper
      spacing={spacingByDensity[density]}
      className={sectionClassName}
      containerClassName={shellClassName}
      backgroundVariant={backgroundVariant}
      backgroundTone={backgroundTone}
      heading={{
        eyebrow,
        title: heading,
        subtext,
        align: headingAlign,
      }}
    >
      <div className={classes.grid}>
        {cards.map((card) => (
          <article key={card.title} className={classes.card}>
            <div className={classes.cardHeading}>
              <CheckCircle size={32} weight="regular" className={classes.icon} />
              <h3>{card.title}</h3>
            </div>

            <p className={classes.cardDescription}>{card.description}</p>

            {card.tags && card.tags.length > 0 ? (
              <div className={classes.tagList}>
                {card.tags.map((tag) => (
                  <span key={tag} className={classes.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            {card.outcome ? (
              <p className={classes.outcome}>
                <strong>What this supports:</strong> {card.outcome}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
