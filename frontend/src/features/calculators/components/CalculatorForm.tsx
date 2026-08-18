'use client';

import { useEffect, useState } from 'react';
import { ChartBar, SlidersHorizontal } from '@phosphor-icons/react/dist/ssr';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { useCalculatorController } from '../hooks/useCalculatorController';
import { CalculatorInputPanel } from './CalculatorInputPanel';
import {
  CalculatorResults,
  type CalculatorResultsStyleClasses,
} from './CalculatorResults';
import { CalculatorResultsCta } from './CalculatorResultsCta';
import classes from './CalculatorForm.module.scss';
import type { CalculatorKind } from '../types/calculator';
import type { CalculatorPageContent } from '../config/pageContent';

type CalculatorFormProps = {
  kind: CalculatorKind;
  resultsCta: CalculatorPageContent['resultsCta'];
};

const resultStyleClasses = {
  resultsPanel: classes.resultsPanel,
  resultsHeader: classes.resultsHeader,
  resultsHeaderTop: classes.resultsHeaderTop,
  resultsHeadingRow: classes.resultsHeadingRow,
  resultsStatus: classes.resultsStatus,
  resultsStatusLive: classes.resultsStatusLive,
  resultsControls: classes.resultsControls,
  outputDisplayLabel: classes.outputDisplayLabel,
  outputDisplayToggle: classes.outputDisplayToggle,
  outputDisplayButton: classes.outputDisplayButton,
  outputDisplayButtonActive: classes.outputDisplayButtonActive,
  resultsBody: classes.resultsBody,
  referencePanel: classes.referencePanel,
  referenceHeader: classes.referenceHeader,
  referenceTitle: classes.referenceTitle,
  referenceUnit: classes.referenceUnit,
  referenceTable: classes.referenceTable,
  referenceActiveRow: classes.referenceActiveRow,
  referenceNote: classes.referenceNote,
  comparisonTable: classes.comparisonTable,
  comparisonHeader: classes.comparisonHeader,
  comparisonRow: classes.comparisonRow,
  comparisonLabel: classes.comparisonLabel,
  comparisonValue: classes.comparisonValue,
  comparisonUnitLabel: classes.comparisonUnitLabel,
  resultsPrimaryGrid: classes.resultsPrimaryGrid,
  resultHeroCard: classes.resultHeroCard,
  resultTileGrid: classes.resultTileGrid,
  resultsSecondary: classes.resultsSecondary,
  resultCard: classes.resultCard,
  resultCardPrimary: classes.resultCardPrimary,
  resultCardMuted: classes.resultCardMuted,
  resultLabel: classes.resultLabel,
  resultValue: classes.resultValue,
  resultSupportingValue: classes.resultSupportingValue,
  resultValueSplit: classes.resultValueSplit,
  resultMeta: classes.resultMeta,
  assumptionsBlock: classes.assumptionsBlock,
  assumptionsTitle: classes.assumptionsTitle,
  assumptionsSummary: classes.assumptionsSummary,
  assumptionsList: classes.assumptionsList,
  assumptionsItem: classes.assumptionsItem,
  costResultCard: classes.costResultCard,
  costResultValue: classes.costResultValue,
  resultDisclaimer: classes.resultDisclaimer,
  shareEstimateButton: classes.shareEstimateButton,
  shareEstimateButtonCopied: classes.shareEstimateButtonCopied,
} satisfies CalculatorResultsStyleClasses;

export function CalculatorForm({ kind, resultsCta }: CalculatorFormProps) {
  const controller = useCalculatorController(kind);
  const [mobileTab, setMobileTab] = useState<'inputs' | 'results'>('inputs');
  const hasResult = Boolean(controller.state.result);

  useEffect(() => {
    if (hasResult) {
      setMobileTab('results');
    }
  }, [hasResult]);

  return (
    <SectionWrapper
      className={classes.section}
      containerClassName={classes.container}
      spacing="loose"
    >
      <div className={classes.shell}>
        <div className={classes.mobileTabs} role="tablist" aria-label="Calculator views">
          <button
            type="button"
            role="tab"
            aria-selected={mobileTab === 'inputs'}
            className={`${classes.mobileTab} ${
              mobileTab === 'inputs' ? classes.mobileTabActive : ''
            }`}
            onClick={() => setMobileTab('inputs')}
          >
            <SlidersHorizontal size={16} weight="bold" aria-hidden="true" />
            Inputs
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mobileTab === 'results'}
            className={`${classes.mobileTab} ${
              mobileTab === 'results' ? classes.mobileTabActive : ''
            }`}
            onClick={() => setMobileTab('results')}
          >
            <ChartBar size={16} weight="bold" aria-hidden="true" />
            {hasResult ? 'Results' : 'Reference'}
            {hasResult ? <span className={classes.mobileTabDot} /> : null}
          </button>
        </div>

        <div
          className={`${classes.inputColumn} ${
            mobileTab === 'results' ? classes.mobileHidden : ''
          }`}
        >
          <CalculatorInputPanel section={controller.sections.inputPanel} />
        </div>

        <div
          className={`${classes.resultsColumn} ${
            mobileTab === 'inputs' ? classes.mobileHidden : ''
          }`}
        >
          <CalculatorResults section={controller.sections.results} classes={resultStyleClasses} />
          {hasResult ? (
            <CalculatorResultsCta controller={controller} content={resultsCta} />
          ) : null}
        </div>
      </div>
    </SectionWrapper>
  );
}
