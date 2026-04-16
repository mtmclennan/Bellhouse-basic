'use client';

import type { CalculatorController } from '../hooks/calculatorController.types';
import { CalculatorAdvancedSection } from './CalculatorAdvancedSection';
import { CalculatorDimensionsSection } from './CalculatorDimensionsSection';
import { CalculatorMaterialSection } from './CalculatorMaterialSection';
import { CalculatorUnitsSection } from './CalculatorUnitsSection';
import classes from './CalculatorForm.module.scss';

type CalculatorInputPanelProps = {
  section: CalculatorController['sections']['inputPanel'];
};

export function CalculatorInputPanel({ section }: CalculatorInputPanelProps) {
  return (
    <div className={classes.panel}>
      <div className={classes.panelHeader}>
        <h2>{section.title}</h2>
      </div>

      <div className={classes.formBody}>
        <CalculatorUnitsSection section={section.units} />
        <CalculatorDimensionsSection section={section.dimensions} />
        {section.material ? (
          <CalculatorMaterialSection section={section.material} />
        ) : null}
        <CalculatorAdvancedSection section={section.advanced} />
      </div>
    </div>
  );
}
