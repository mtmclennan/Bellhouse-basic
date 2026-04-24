import type { ComponentPropsWithoutRef } from 'react';

import classes from './ServiceCardGrid.module.scss';

type ServiceCardGridProps = ComponentPropsWithoutRef<'div'>;

export default function ServiceCardGrid({
  className,
  ...props
}: ServiceCardGridProps) {
  const resolvedClassName = [classes.grid, className].filter(Boolean).join(' ');

  return <div className={resolvedClassName} {...props} />;
}
