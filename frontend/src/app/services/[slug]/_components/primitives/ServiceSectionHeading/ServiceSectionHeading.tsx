import type { ReactNode } from 'react';

import classes from './ServiceSectionHeading.module.scss';

interface ServiceSectionHeadingProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtext?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  titleAs?: 'h1' | 'h2' | 'h3';
}

export default function ServiceSectionHeading({
  eyebrow,
  title,
  subtext,
  align = 'center',
  className,
  titleAs: TitleTag = 'h2',
}: ServiceSectionHeadingProps) {
  if (!eyebrow && !title && !subtext) {
    return null;
  }

  const headingClassName = [
    classes.heading,
    align === 'left' ? classes.alignLeft : classes.alignCenter,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={headingClassName}>
      {eyebrow ? <p className={classes.eyebrow}>{eyebrow}</p> : null}
      {title ? <TitleTag className={classes.title}>{title}</TitleTag> : null}
      {subtext ? <p className={classes.subtext}>{subtext}</p> : null}
    </div>
  );
}
