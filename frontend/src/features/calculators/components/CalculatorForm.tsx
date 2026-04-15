'use client';

import SectionWrapper from '@/components/layout/SectionWrapper';
import { useCalculatorController } from '../hooks/useCalculatorController';
import { CalculatorInputPanel } from './CalculatorInputPanel';
import {
  CalculatorResults,
  type CalculatorResultsStyleClasses,
} from './CalculatorResults';
import classes from './CalculatorForm.module.scss';
import type { CalculatorKind } from '../types/calculator';

type CalculatorFormProps = {
  kind: CalculatorKind;
};

const resultStyleClasses = {
  resultsPanel: classes.resultsPanel,
  resultsHeader: classes.resultsHeader,
  resultsHeaderTop: classes.resultsHeaderTop,
  resultsControls: classes.resultsControls,
  resultsBody: classes.resultsBody,
  placeholder: classes.placeholder,
  resultsPrimaryGrid: classes.resultsPrimaryGrid,
  resultsSecondary: classes.resultsSecondary,
  resultCard: classes.resultCard,
  resultCardPrimary: classes.resultCardPrimary,
  resultCardMuted: classes.resultCardMuted,
  resultLabel: classes.resultLabel,
  resultValue: classes.resultValue,
  resultValueSplit: classes.resultValueSplit,
  resultMeta: classes.resultMeta,
  assumptionsBlock: classes.assumptionsBlock,
  assumptionsTitle: classes.assumptionsTitle,
  assumptionsGrid: classes.assumptionsGrid,
  assumptionItem: classes.assumptionItem,
  assumptionLabel: classes.assumptionLabel,
  assumptionValue: classes.assumptionValue,
  resultDisclaimer: classes.resultDisclaimer,
} satisfies CalculatorResultsStyleClasses;

export function CalculatorForm({ kind }: CalculatorFormProps) {
  const controller = useCalculatorController(kind);

  return (
    <SectionWrapper
      className={classes.section}
      containerClassName={classes.container}
      spacing="loose"
    >
      <div className={classes.shell}>
        <CalculatorInputPanel section={controller.sections.inputPanel} />

        <CalculatorResults section={controller.sections.results} classes={resultStyleClasses} />
      </div>
    </SectionWrapper>
  );
}
