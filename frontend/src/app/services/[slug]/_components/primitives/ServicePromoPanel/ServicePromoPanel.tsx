import type { ReactNode } from 'react';

import classes from './ServicePromoPanel.module.scss';

interface ServicePromoPanelProps {
  className?: string;
  actionsClassName?: string;
  children: ReactNode;
  actions?: ReactNode;
}

export default function ServicePromoPanel({
  className,
  actionsClassName,
  children,
  actions,
}: ServicePromoPanelProps) {
  const panelClassName = [classes.panel, className].filter(Boolean).join(' ');
  const resolvedActionsClassName = [classes.actions, actionsClassName]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={panelClassName}>
      {children}
      {actions ? <div className={resolvedActionsClassName}>{actions}</div> : null}
    </div>
  );
}
