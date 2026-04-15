import type { ReactNode } from 'react';
import { m3ToCubicYards } from '../logic/conversions';
import { formatNumber, formatTruckLoads } from '../utils/format';
import { MetricImperialSwitch } from './MetricImperialSwitch';
import type {
  CalculatorResult,
  OutputUnitPreference,
} from '../types/calculator';
import type { CalculatorConfig } from '../config/calculators';

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

type CalculatorAssumptions = {
  material: string;
  swellFactor: number;
  truckPayloadTons: number;
  moistureLevel?: string;
  isHalfLoad?: boolean;
  compactionPercentage?: number;
};

type CalculatorResultsProps = {
  result: CalculatorResult | null;
  outputUnitPreference: OutputUnitPreference;
  onOutputUnitPreferenceChange: (value: OutputUnitPreference) => void;
  outputDisplayLabel: string;
  resultPresentation: CalculatorConfig['resultPresentation'];
  assumptions: CalculatorAssumptions | null;
  classes: CalculatorResultsStyleClasses;
};

function renderVolume(
  cubicMetres: number,
  outputUnitPreference: OutputUnitPreference,
): ReactNode {
  const cubicYards = m3ToCubicYards(cubicMetres);

  if (outputUnitPreference === 'metric') {
    return `${formatNumber(cubicMetres)} m3`;
  }

  if (outputUnitPreference === 'imperial') {
    return `${formatNumber(cubicYards)} yd3`;
  }

  return `${formatNumber(cubicMetres)} m3`;
}

export function CalculatorResults({
  result,
  outputUnitPreference,
  onOutputUnitPreferenceChange,
  outputDisplayLabel,
  resultPresentation,
  assumptions,
  classes,
}: CalculatorResultsProps) {
  const showsSeparateLooseMaterial = Boolean(
    resultPresentation.adjustedVolumeLabel,
  );

  const primaryVolumeValueM3 = result
    ? showsSeparateLooseMaterial
      ? result.rawProjectVolumeM3
      : result.adjustedMaterialVolumeM3
    : null;

  return (
    <div className={classes.resultsPanel}>
      <div className={classes.resultsHeader}>
        <div className={classes.resultsHeaderTop}>
          <h2>Results</h2>
          <div className={classes.resultsControls}>
            <MetricImperialSwitch
              label={outputDisplayLabel}
              value={outputUnitPreference}
              onChange={onOutputUnitPreferenceChange}
              metricLabel="Metric"
              imperialLabel="Imperial"
              tone="dark"
            />
          </div>
        </div>
      </div>

      <div className={classes.resultsBody}>
        {!result ? (
          <div className={classes.placeholder}>
            <p>Enter dimensions to see volume, material, weight, and truck loads.</p>
          </div>
        ) : (
          <>
            <div className={classes.resultsPrimaryGrid}>
              <article className={`${classes.resultCard} ${classes.resultCardPrimary}`}>
                <span className={classes.resultLabel}>{resultPresentation.volumeLabel}</span>
                <strong className={classes.resultValue}>
                  {renderVolume(primaryVolumeValueM3 ?? 0, outputUnitPreference)}
                </strong>
                {resultPresentation.showCardMeta ? (
                  <p className={classes.resultMeta}>Adjusted total material volume.</p>
                ) : null}
              </article>

              {resultPresentation.adjustedVolumeLabel ? (
                <article className={`${classes.resultCard} ${classes.resultCardPrimary}`}>
                  <span className={classes.resultLabel}>
                    {resultPresentation.adjustedVolumeLabel}
                  </span>
                  <strong className={classes.resultValue}>
                    {renderVolume(
                      result.adjustedLooseMaterialVolumeM3,
                      outputUnitPreference,
                    )}
                  </strong>
                </article>
              ) : null}

              <article className={`${classes.resultCard} ${classes.resultCardPrimary}`}>
                <span className={classes.resultLabel}>{resultPresentation.weightLabel}</span>
                <strong className={classes.resultValue}>
                  {formatNumber(result.adjustedWeightTons)} tonnes
                </strong>
                {resultPresentation.showCardMeta ? (
                  <p className={classes.resultMeta}>
                    Based on material density and wet adjustment.
                  </p>
                ) : null}
              </article>

              <article className={`${classes.resultCard} ${classes.resultCardPrimary}`}>
                <span className={classes.resultLabel}>
                  {resultPresentation.truckLoadsLabel}
                </span>
                <strong className={classes.resultValue}>
                  {formatTruckLoads(result.estimatedTruckLoads)}
                </strong>
                {resultPresentation.showCardMeta ? (
                  <p className={classes.resultMeta}>
                    Based on truck capacity and half-load mode if used.
                  </p>
                ) : null}
              </article>
            </div>

            {resultPresentation.secondaryVolumeLabel ? (
              <div className={classes.resultsSecondary}>
                <article
                  className={`${classes.resultCard} ${classes.resultCardMuted}`}
                >
                  <span className={classes.resultLabel}>
                    {resultPresentation.secondaryVolumeLabel}
                  </span>
                  <strong className={classes.resultValue}>
                    {renderVolume(
                      result.rawProjectVolumeM3,
                      outputUnitPreference,
                    )}
                  </strong>
                  {resultPresentation.showCardMeta ? (
                    <p className={classes.resultMeta}>Before advanced adjustments.</p>
                  ) : null}
                </article>
              </div>
            ) : null}
          </>
        )}

        {assumptions ? (
          <div className={classes.assumptionsBlock}>
            <span className={classes.assumptionsTitle}>Active assumptions</span>
            <div className={classes.assumptionsGrid}>
              <div className={classes.assumptionItem}>
                <span className={classes.assumptionLabel}>Material</span>
                <span className={classes.assumptionValue}>
                  {assumptions.material}
                </span>
              </div>
              <div className={classes.assumptionItem}>
                <span className={classes.assumptionLabel}>Swell factor</span>
                <span className={classes.assumptionValue}>
                  {formatNumber(assumptions.swellFactor)}
                </span>
              </div>
              <div className={classes.assumptionItem}>
                <span className={classes.assumptionLabel}>Truck payload</span>
                <span className={classes.assumptionValue}>
                  {formatNumber(assumptions.truckPayloadTons)} tons
                </span>
              </div>
              {assumptions.moistureLevel ? (
                <div className={classes.assumptionItem}>
                  <span className={classes.assumptionLabel}>Moisture</span>
                  <span className={classes.assumptionValue}>
                    {assumptions.moistureLevel}
                  </span>
                </div>
              ) : null}
              {assumptions.isHalfLoad ? (
                <div className={classes.assumptionItem}>
                  <span className={classes.assumptionLabel}>Half-load mode</span>
                  <span className={classes.assumptionValue}>On</span>
                </div>
              ) : null}
              {assumptions.compactionPercentage !== undefined &&
              assumptions.compactionPercentage !== 0 ? (
                <div className={classes.assumptionItem}>
                  <span className={classes.assumptionLabel}>Compaction</span>
                  <span className={classes.assumptionValue}>
                    {formatNumber(assumptions.compactionPercentage)}%
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        <p className={classes.resultDisclaimer}>
          Estimate only. Site conditions, moisture, compaction, and hauling limits can affect actual quantities.
        </p>
      </div>
    </div>
  );
}
