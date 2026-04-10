import type { ReactNode } from 'react';
import { m3ToCubicYards } from '../logic/conversions';
import { formatNumber, formatTruckLoads } from '../utils/format';
import type {
  CalculatorResult,
  OutputUnitPreference,
} from '../types/calculator';

type CalculatorResultsStyleClasses = {
  resultsPanel: string;
  resultsHeader: string;
  resultsBody: string;
  resultsIntro: string;
  placeholder: string;
  resultsGrid: string;
  resultCard: string;
  resultCardPrimary: string;
  resultLabel: string;
  resultValue: string;
  resultValueSplit: string;
  resultMeta: string;
  resultDisclaimer: string;
};

type CalculatorResultsProps = {
  result: CalculatorResult | null;
  outputUnitPreference: OutputUnitPreference;
  classes: CalculatorResultsStyleClasses;
};

function renderVolume(
  cubicMetres: number,
  outputUnitPreference: OutputUnitPreference,
  resultValueSplitClassName: string,
): ReactNode {
  const cubicYards = m3ToCubicYards(cubicMetres);

  if (outputUnitPreference === 'metric') {
    return `${formatNumber(cubicMetres)} m3`;
  }

  if (outputUnitPreference === 'imperial') {
    return `${formatNumber(cubicYards)} yd3`;
  }

  return (
    <span className={resultValueSplitClassName}>
      <span>{formatNumber(cubicMetres)} m3</span>
      <span aria-hidden="true">/</span>
      <span>{formatNumber(cubicYards)} yd3</span>
    </span>
  );
}

export function CalculatorResults({
  result,
  outputUnitPreference,
  classes,
}: CalculatorResultsProps) {
  return (
    <div className={classes.resultsPanel}>
      <div className={classes.resultsHeader}>
        <h2>Estimated Results</h2>
        <p>
          Review the material volume, weight, and truck count in a format that
          is easy to scan from the site or the office.
        </p>
      </div>

      <div className={classes.resultsBody}>
        {!result ? (
          <div className={classes.placeholder}>
            <p>
              Enter complete project dimensions and keep any enabled advanced
              settings valid to see estimated base volume, adjusted volume,
              tonnage, and truck loads.
            </p>
          </div>
        ) : (
          <>
            <p className={classes.resultsIntro}>
              Results stay stacked and readable on smaller screens so you can
              check the numbers quickly while you are on site.
            </p>

            <div className={classes.resultsGrid}>
              <article
                className={`${classes.resultCard} ${classes.resultCardPrimary}`}
              >
                <span className={classes.resultLabel}>Adjusted Volume</span>
                <strong className={classes.resultValue}>
                  {renderVolume(
                    result.adjustedVolumeM3,
                    outputUnitPreference,
                    classes.resultValueSplit,
                  )}
                </strong>
                <p className={classes.resultMeta}>
                  Final material volume after the selected advanced settings are
                  applied.
                </p>
              </article>

              <article className={classes.resultCard}>
                <span className={classes.resultLabel}>Base Volume</span>
                <strong className={classes.resultValue}>
                  {renderVolume(
                    result.baseVolumeM3,
                    outputUnitPreference,
                    classes.resultValueSplit,
                  )}
                </strong>
                <p className={classes.resultMeta}>
                  Straight calculated excavation or fill volume before advanced
                  adjustments.
                </p>
              </article>

              <article className={classes.resultCard}>
                <span className={classes.resultLabel}>Estimated Weight</span>
                <strong className={classes.resultValue}>
                  {formatNumber(result.tons)} tonnes
                </strong>
                <p className={classes.resultMeta}>
                  Tonnage includes the selected material density and any wet
                  material percentage adjustment.
                </p>
              </article>

              <article className={classes.resultCard}>
                <span className={classes.resultLabel}>Estimated Truck Loads</span>
                <strong className={classes.resultValue}>
                  {formatTruckLoads(result.truckLoads)}
                </strong>
                <p className={classes.resultMeta}>
                  Load count uses the truck capacity entered in advanced
                  settings, including half-load mode if selected.
                </p>
              </article>
            </div>
          </>
        )}

        <p className={classes.resultDisclaimer}>
          Estimates are based on typical material densities and conditions.
          Actual quantities may vary depending on site conditions, moisture, and
          hauling requirements.
        </p>
      </div>
    </div>
  );
}
