import type { ElementType, ReactNode } from 'react';

import SectionWrapper from '@/components/layout/SectionWrapper';
import classes from './ServiceSectionWrapper.module.scss';

type ServiceSectionWrapperSpacing = 'tight' | 'default' | 'loose' | '4' | '6' | '8' | '10';
type ServiceSectionWrapperBackgroundVariant = 'light' | 'dark' | 'transparent';
type ServiceSectionWrapperBackgroundTone = 'default' | 'soft' | 'muted';
type ServiceSectionWrapperHeadingAlign = 'left' | 'center';

type ServiceSectionHeading = {
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtext?: ReactNode;
  align?: ServiceSectionWrapperHeadingAlign;
  className?: string;
  titleAs?: 'h1' | 'h2' | 'h3';
  titleId?: string;
};

interface ServiceSectionWrapperProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  spacing?: ServiceSectionWrapperSpacing;
  backgroundVariant?: ServiceSectionWrapperBackgroundVariant;
  backgroundTone?: ServiceSectionWrapperBackgroundTone;
  heading?: ServiceSectionHeading;
}

export default function ServiceSectionWrapper({
  className,
  containerClassName,
  ...props
}: ServiceSectionWrapperProps) {
  const sectionClassName = [classes.section, className].filter(Boolean).join(' ');
  const resolvedContainerClassName = [classes.container, containerClassName]
    .filter(Boolean)
    .join(' ');

  return (
    <SectionWrapper
      {...props}
      className={sectionClassName}
      containerClassName={resolvedContainerClassName}
    />
  );
}
