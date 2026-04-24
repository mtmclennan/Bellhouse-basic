import type { ElementType, ReactNode } from 'react';
import classes from './SectionWrapper.module.scss';

type SectionWrapperSpacing = 'tight' | 'default' | 'loose';
type SectionWrapperSpacingToken =
  | SectionWrapperSpacing
  | '4'
  | '6'
  | '8'
  | '10';

type SectionWrapperBackgroundVariant = 'light' | 'dark' | 'transparent';
type SectionWrapperBackgroundTone = 'default' | 'soft' | 'muted';
type SectionWrapperHeadingAlign = 'left' | 'center';

type SectionWrapperHeading = {
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtext?: ReactNode;
  align?: SectionWrapperHeadingAlign;
  className?: string;
  titleAs?: 'h1' | 'h2' | 'h3';
  titleId?: string;
};

type SectionWrapperProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  spacing?: SectionWrapperSpacingToken;
  backgroundVariant?: SectionWrapperBackgroundVariant;
  backgroundTone?: SectionWrapperBackgroundTone;
  heading?: SectionWrapperHeading;
};

const spacingClassNames: Record<SectionWrapperSpacingToken, string> = {
  '4': classes.space4,
  '6': classes.space6,
  '8': classes.space8,
  '10': classes.space10,
  tight: classes.tight,
  default: '',
  loose: classes.loose,
};

const backgroundVariantClassNames: Record<SectionWrapperBackgroundVariant, string> = {
  light: classes.variantLight,
  dark: classes.variantDark,
  transparent: classes.variantTransparent,
};

const backgroundToneClassNames: Record<SectionWrapperBackgroundTone, string> = {
  default: classes.toneDefault,
  soft: classes.toneSoft,
  muted: classes.toneMuted,
};

const headingAlignClassNames: Record<SectionWrapperHeadingAlign, string> = {
  left: classes.headingLeft,
  center: classes.headingCenter,
};

export default function SectionWrapper({
  as: Component = 'section',
  children,
  className = '',
  containerClassName = '',
  spacing = 'default',
  backgroundVariant,
  backgroundTone = 'default',
  heading,
}: SectionWrapperProps) {
  const sectionClassName = [
    classes.section,
    spacingClassNames[spacing],
    backgroundVariant ? backgroundVariantClassNames[backgroundVariant] : '',
    backgroundVariant ? backgroundToneClassNames[backgroundTone] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const contentClassName = [classes.container, containerClassName]
    .filter(Boolean)
    .join(' ');

  const HeadingTag = heading?.titleAs ?? 'h2';
  const headingClassName = heading
    ? [
        classes.headingBlock,
        headingAlignClassNames[heading.align ?? 'center'],
        heading.className ?? '',
      ]
        .filter(Boolean)
        .join(' ')
    : '';

  return (
    <Component className={sectionClassName}>
      <div className={contentClassName}>
        {heading ? (
          <div className={headingClassName}>
            {heading.eyebrow ? (
              <p className={classes.eyebrow}>{heading.eyebrow}</p>
            ) : null}
            {heading.title ? (
              <HeadingTag className={classes.title} id={heading.titleId}>
                {heading.title}
              </HeadingTag>
            ) : null}
            {heading.subtext ? (
              <p className={classes.subtext}>{heading.subtext}</p>
            ) : null}
          </div>
        ) : null}
        {children}
      </div>
    </Component>
  );
}
