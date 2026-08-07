'use client';

import Link from '@/components/SiteLink';
import { trackCalculatorQuoteClicked } from '../analytics/calculatorAnalyticsActions';
import { buildCalculatorLeadData } from '../lead/buildCalculatorLeadData';
import { saveCalculatorLead } from '../lead/calculatorLeadStorage';
import type { CalculatorController } from '../hooks/calculatorController.types';
import type { CalculatorPageContent } from '../config/pageContent';
import classes from './CalculatorForm.module.scss';

type CalculatorResultsCtaProps = {
  controller: CalculatorController;
  content: CalculatorPageContent['resultsCta'];
};

export function CalculatorResultsCta({ controller, content }: CalculatorResultsCtaProps) {
  const { kind, config, sections, state } = controller;
  const { result, material, input } = state;

  if (!result || !material) {
    return null;
  }

  const contactHref = `/contact?service=${kind}&source=calculator`;

  const handleClick = () => {
    const lead = buildCalculatorLeadData({
      kind,
      config,
      input,
      material,
      result,
      assumptionsSummary: sections.results.assumptions?.summary,
    });

    // Best-effort: the link's href always navigates even if storage fails.
    saveCalculatorLead(lead);

    trackCalculatorQuoteClicked({
      calculatorType: kind,
      unitSystem: input.inputUnitSystem,
      hasValidResult: Boolean(result),
    });
  };

  return (
    <div className={classes.resultsCta}>
      <h3 className={classes.resultsCtaHeading}>{content.heading}</h3>
      <p className={classes.resultsCtaDescription}>{content.description}</p>
      <Link href={contactHref} className={classes.resultsCtaButton} onClick={handleClick}>
        {content.buttonLabel}
      </Link>
    </div>
  );
}
