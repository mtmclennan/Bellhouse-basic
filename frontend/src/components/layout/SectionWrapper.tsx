import type { ElementType, ReactNode } from 'react';
import classes from './SectionWrapper.module.scss';

type SectionWrapperSpacing = 'tight' | 'default' | 'loose';

type SectionWrapperProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  spacing?: SectionWrapperSpacing;
};

const spacingClassNames: Record<SectionWrapperSpacing, string> = {
  tight: classes.tight,
  default: '',
  loose: classes.loose,
};

export default function SectionWrapper({
  as: Component = 'section',
  children,
  className = '',
  containerClassName = '',
  spacing = 'default',
}: SectionWrapperProps) {
  const sectionClassName = [classes.section, spacingClassNames[spacing], className]
    .filter(Boolean)
    .join(' ');

  const contentClassName = [classes.container, containerClassName]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={sectionClassName}>
      <div className={contentClassName}>{children}</div>
    </Component>
  );
}
