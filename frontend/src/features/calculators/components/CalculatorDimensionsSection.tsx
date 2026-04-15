'use client';

import type {
  CalculatorDimensionsSection as CalculatorDimensionsSectionModel,
} from '../hooks/calculatorController.types';
import { CalculatorDimensionField } from './CalculatorDimensionField';
import classes from './CalculatorForm.module.scss';

type CalculatorDimensionsSectionProps = {
  section: CalculatorDimensionsSectionModel;
};

export function CalculatorDimensionsSection({
  section,
}: CalculatorDimensionsSectionProps) {
  return (
    <div className={`${classes.fieldGroup} ${classes.fieldGroupPrimary}`}>
      <p className={classes.fieldGroupLabel}>{section.title}</p>

      <div className={classes.dimensionGrid}>
        {section.fields.map((dimensionField) => (
          <CalculatorDimensionField
            key={dimensionField.key}
            field={dimensionField}
          />
        ))}
      </div>
    </div>
  );
}
