'use client';

import {
  ArrowLeft,
  Check,
  ShareNetwork,
  Warning,
} from '@phosphor-icons/react';
import type { CalculatorResultsSection } from '../hooks/calculatorController.types';
import type { OutputUnitPreference } from '../types/calculator';

export type CalculatorResultsStyleClasses = {
  resultsPanel: string;
  resultsHeader: string;
  resultsHeaderTop: string;
  resultsHeadingRow: string;
  resultsStatus: string;
  resultsStatusLive: string;
  resultsControls: string;
  outputDisplayLabel: string;
  outputDisplayToggle: string;
  outputDisplayButton: string;
  outputDisplayButtonActive: string;
  resultsBody: string;
  referencePanel: string;
  referenceHeader: string;
  referenceTitle: string;
  referenceUnit: string;
  referenceTable: string;
  referenceActiveRow: string;
  referenceNote: string;
  comparisonTable: string;
  comparisonHeader: string;
  comparisonRow: string;
  comparisonLabel: string;
  comparisonValue: string;
  comparisonUnitLabel: string;
  resultsPrimaryGrid: string;
  resultHeroCard: string;
  resultTileGrid: string;
  resultsSecondary: string;
  resultCard: string;
  resultCardPrimary: string;
  resultCardMuted: string;
  resultLabel: string;
  resultValue: string;
  resultSupportingValue: string;
  resultValueSplit: string;
  resultMeta: string;
  assumptionsBlock: string;
  assumptionsTitle: string;
  assumptionsSummary: string;
  assumptionsList: string;
  assumptionsItem: string;
  costResultCard: string;
  costResultValue: string;
  resultDisclaimer: string;
  shareEstimateButton: string;
  shareEstimateButtonCopied: string;
};

const outputLabels: Record<OutputUnitPreference, string> = {
  same: 'Same',
  metric: 'Metric',
  imperial: 'Imperial',
  both: 'Both',
};

type CalculatorResultsProps = {
  section: CalculatorResultsSection;
  classes: CalculatorResultsStyleClasses;
};

export function CalculatorResults({
  section,
  classes,
}: CalculatorResultsProps) {
  const hasResults = section.primaryCards.length > 0;
  const [heroCard, ...supportingPrimaryCards] = section.primaryCards;
  const supportingCards = [
    ...supportingPrimaryCards,
    ...section.secondaryCards,
  ];

  return (
    <div className={classes.resultsPanel}>
      <div className={classes.resultsHeader}>
        <div className={classes.resultsHeaderTop}>
          <div className={classes.resultsHeadingRow}>
            <h2>{section.title}</h2>
            {hasResults ? (
              <span
                className={`${classes.resultsStatus} ${classes.resultsStatusLive}`}
              >
                Live
              </span>
            ) : null}
          </div>
          {hasResults ? (
            <div className={classes.resultsControls}>
              <span className={classes.outputDisplayLabel}>
                {section.outputDisplay.label}
              </span>
              <div
                className={classes.outputDisplayToggle}
                role="group"
                aria-label={section.outputDisplay.label}
              >
                {section.outputDisplay.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`${classes.outputDisplayButton} ${
                      section.outputDisplay.value === option
                        ? classes.outputDisplayButtonActive
                        : ''
                    }`}
                    onClick={() => section.outputDisplay.onChange(option)}
                    aria-pressed={section.outputDisplay.value === option}
                  >
                    {outputLabels[option]}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className={classes.resultsBody}>
        {section.primaryCards.length === 0 ? (
          <div className={classes.referencePanel}>
            <div className={classes.referenceHeader}>
              <span className={classes.referenceTitle}>
                {section.reference.title}
              </span>
              <span className={classes.referenceUnit}>
                {section.reference.unitLabel}
              </span>
            </div>
            <table className={classes.referenceTable}>
              <thead>
                <tr>
                  <th scope="col">Material</th>
                  <th scope="col">Adj.</th>
                  <th scope="col">Weight</th>
                </tr>
              </thead>
              <tbody>
                {section.reference.rows.map((row) => (
                  <tr
                    key={row.id}
                    className={row.isActive ? classes.referenceActiveRow : ''}
                  >
                    <th scope="row">{row.label}</th>
                    <td>{row.adjustment}</td>
                    <td>{row.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className={classes.referenceNote}>
              <ArrowLeft size={14} weight="bold" aria-hidden="true" />
              {section.placeholderMessage}
            </p>
          </div>
        ) : section.outputDisplay.value === 'both' ? (
          <div className={classes.comparisonTable}>
            <div className={classes.comparisonHeader}>
              <span />
              <span className={classes.comparisonUnitLabel}>Imperial</span>
              <span className={classes.comparisonUnitLabel}>Metric</span>
            </div>
            {section.comparisonRows.map((row) => (
              <div key={row.id} className={classes.comparisonRow}>
                <span className={classes.comparisonLabel}>{row.label}</span>
                <strong className={classes.comparisonValue}>
                  {row.imperialValue}
                </strong>
                <strong className={classes.comparisonValue}>
                  {row.metricValue}
                </strong>
              </div>
            ))}
          </div>
        ) : (
          <>
            {heroCard ? (
              <article
                className={`${classes.resultCard} ${classes.resultCardPrimary} ${classes.resultHeroCard}`}
              >
                <span className={classes.resultLabel}>{heroCard.label}</span>
                <strong className={classes.resultValue}>{heroCard.value}</strong>
                {heroCard.supportingValue ? (
                  <p className={classes.resultSupportingValue}>
                    {heroCard.supportingValue}
                  </p>
                ) : null}
                {heroCard.meta ? (
                  <p className={classes.resultMeta}>{heroCard.meta}</p>
                ) : null}
              </article>
            ) : null}

            {supportingCards.length > 0 || section.costEstimate ? (
              <div className={classes.resultTileGrid}>
                {supportingCards.map((card) => (
                  <article
                    key={card.id}
                    className={`${classes.resultCard} ${
                      card.tone === 'muted'
                        ? classes.resultCardMuted
                        : classes.resultCardPrimary
                    }`}
                  >
                    <strong className={classes.resultValue}>{card.value}</strong>
                    <span className={classes.resultLabel}>{card.label}</span>
                    {card.supportingValue ? (
                      <p className={classes.resultSupportingValue}>
                        {card.supportingValue}
                      </p>
                    ) : null}
                    {card.meta ? (
                      <p className={classes.resultMeta}>{card.meta}</p>
                    ) : null}
                  </article>
                ))}
                {section.costEstimate ? (
                  <article
                    className={`${classes.resultCard} ${classes.costResultCard}`}
                  >
                    <strong className={classes.costResultValue}>
                      {section.costEstimate.value}
                    </strong>
                    <span className={classes.resultLabel}>Est. job cost</span>
                    <p className={classes.resultMeta}>
                      {section.costEstimate.meta}
                    </p>
                  </article>
                ) : null}
              </div>
            ) : null}
          </>
        )}

        {hasResults && section.assumptions ? (
          <div className={classes.assumptionsBlock}>
            <span className={classes.assumptionsTitle}>
              {section.assumptions.title}
            </span>
            <p className={classes.assumptionsSummary}>{section.assumptions.summary}</p>
            {section.assumptions.items?.length ? (
              <ul className={classes.assumptionsList}>
                {section.assumptions.items.map((item) => (
                  <li key={item} className={classes.assumptionsItem}>
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}

        {hasResults ? (
          <p className={classes.resultDisclaimer}>
            <Warning size={14} weight="fill" aria-hidden="true" />
            {section.disclaimer}
          </p>
        ) : null}

        {hasResults ? (
          <button
            type="button"
            className={`${classes.shareEstimateButton} ${
              section.share.isCopied ? classes.shareEstimateButtonCopied : ''
            }`}
            onClick={section.share.onClick}
          >
            {section.share.isCopied ? (
              <Check size={17} weight="bold" aria-hidden="true" />
            ) : (
              <ShareNetwork size={17} weight="bold" aria-hidden="true" />
            )}
            {section.share.label}
          </button>
        ) : null}
      </div>
    </div>
  );
}
