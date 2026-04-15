import { MetricImperialSwitch } from './MetricImperialSwitch';
import type { CalculatorResultsSection } from '../hooks/calculatorController.types';

export type CalculatorResultsStyleClasses = {
  resultsPanel: string;
  resultsHeader: string;
  resultsHeaderTop: string;
  resultsControls: string;
  resultsBody: string;
  placeholder: string;
  resultsPrimaryGrid: string;
  resultsSecondary: string;
  resultCard: string;
  resultCardPrimary: string;
  resultCardMuted: string;
  resultLabel: string;
  resultValue: string;
  resultValueSplit: string;
  resultMeta: string;
  assumptionsBlock: string;
  assumptionsTitle: string;
  assumptionsGrid: string;
  assumptionItem: string;
  assumptionLabel: string;
  assumptionValue: string;
  resultDisclaimer: string;
};

type CalculatorResultsProps = {
  section: CalculatorResultsSection;
  classes: CalculatorResultsStyleClasses;
};

export function CalculatorResults({
  section,
  classes,
}: CalculatorResultsProps) {
  return (
    <div className={classes.resultsPanel}>
      <div className={classes.resultsHeader}>
        <div className={classes.resultsHeaderTop}>
          <h2>{section.title}</h2>
          <div className={classes.resultsControls}>
            <MetricImperialSwitch
              label={section.outputDisplay.label}
              value={section.outputDisplay.value}
              onChange={section.outputDisplay.onChange}
              metricLabel={section.outputDisplay.metricLabel}
              imperialLabel={section.outputDisplay.imperialLabel}
              tone="dark"
            />
          </div>
        </div>
      </div>

      <div className={classes.resultsBody}>
        {section.primaryCards.length === 0 ? (
          <div className={classes.placeholder}>
            <p>{section.placeholderMessage}</p>
          </div>
        ) : (
          <>
            <div className={classes.resultsPrimaryGrid}>
              {section.primaryCards.map((card) => (
                <article
                  key={`${card.label}-${card.value}`}
                  className={`${classes.resultCard} ${
                    card.tone === 'muted'
                      ? classes.resultCardMuted
                      : classes.resultCardPrimary
                  }`}
                >
                  <span className={classes.resultLabel}>{card.label}</span>
                  <strong className={classes.resultValue}>{card.value}</strong>
                  {card.meta ? (
                    <p className={classes.resultMeta}>{card.meta}</p>
                  ) : null}
                </article>
              ))}
            </div>

            {section.secondaryCards.length > 0 ? (
              <div className={classes.resultsSecondary}>
                {section.secondaryCards.map((card) => (
                  <article
                    key={`${card.label}-${card.value}`}
                    className={`${classes.resultCard} ${
                      card.tone === 'muted'
                        ? classes.resultCardMuted
                        : classes.resultCardPrimary
                    }`}
                  >
                    <span className={classes.resultLabel}>{card.label}</span>
                    <strong className={classes.resultValue}>{card.value}</strong>
                    {card.meta ? (
                      <p className={classes.resultMeta}>{card.meta}</p>
                    ) : null}
                  </article>
                ))}
              </div>
            ) : null}
          </>
        )}

        {section.assumptions ? (
          <div className={classes.assumptionsBlock}>
            <span className={classes.assumptionsTitle}>
              {section.assumptions.title}
            </span>
            <div className={classes.assumptionsGrid}>
              {section.assumptions.items.map((item) => (
                <div
                  key={`${item.label}-${item.value}`}
                  className={classes.assumptionItem}
                >
                  <span className={classes.assumptionLabel}>{item.label}</span>
                  <span className={classes.assumptionValue}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <p className={classes.resultDisclaimer}>{section.disclaimer}</p>
      </div>
    </div>
  );
}
