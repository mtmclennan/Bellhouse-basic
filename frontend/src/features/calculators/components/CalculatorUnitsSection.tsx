'use client';

import type { CalculatorUnitsSection as CalculatorUnitsSectionModel } from '../hooks/calculatorController.types';
import { MetricImperialSwitch } from './MetricImperialSwitch';
import classes from './CalculatorForm.module.scss';

type CalculatorUnitsSectionProps = {
  section: CalculatorUnitsSectionModel;
};

export function CalculatorUnitsSection({ section }: CalculatorUnitsSectionProps) {
  return (
    <div className={classes.fieldGroup}>
      <p className={classes.fieldGroupLabel}>{section.title}</p>

      <MetricImperialSwitch
        label={section.label}
        value={section.value}
        onChange={section.onChange}
        metricLabel={section.metricLabel}
        imperialLabel={section.imperialLabel}
      />
    </div>
  );
}
