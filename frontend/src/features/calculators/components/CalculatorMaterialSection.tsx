'use client';

import type { CalculatorMaterialSection as CalculatorMaterialSectionModel } from '../hooks/calculatorController.types';
import classes from './CalculatorForm.module.scss';

type CalculatorMaterialSectionProps = {
  section: CalculatorMaterialSectionModel;
};

export function CalculatorMaterialSection({
  section,
}: CalculatorMaterialSectionProps) {
  return (
    <div className={classes.fieldGroup}>
      <p className={classes.fieldGroupLabel}>{section.title}</p>

      <label className={classes.field}>
        <span>{section.label}</span>
        <select
          value={section.value}
          onChange={(e) => section.onChange(e.target.value as typeof section.value)}
          className={classes.selectControl}
        >
          {section.options.map((materialOption) => (
            <option key={materialOption.id} value={materialOption.id}>
              {materialOption.name}
            </option>
          ))}
        </select>
        {section.helperText ? (
          <p className={classes.fieldNote}>{section.helperText}</p>
        ) : null}
      </label>
    </div>
  );
}
