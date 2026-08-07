'use client';

import type { ReactNode } from 'react';
import Link from '@/components/SiteLink';
import { trackCalculatorServiceLinkClicked } from '../analytics/calculatorAnalyticsActions';
import type { CalculatorDestinationType } from '../analytics/calculatorAnalyticsEvents';
import type { CalculatorKind } from '../types/calculator';

type CalculatorTrackedLinkProps = {
  href: string;
  kind: CalculatorKind;
  destinationType: CalculatorDestinationType;
  className?: string;
  children: ReactNode;
};

/**
 * CalculatorPageShell is a server component (no browser APIs), so related
 * service/tool links are rendered through this small client wrapper purely
 * to attach calculator_service_link_clicked tracking.
 */
export function CalculatorTrackedLink({
  href,
  kind,
  destinationType,
  className,
  children,
}: CalculatorTrackedLinkProps) {
  const handleClick = () => {
    trackCalculatorServiceLinkClicked({
      calculatorType: kind,
      href,
      destinationType,
    });
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
