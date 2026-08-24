'use client';

import { Plus, Trash } from '@phosphor-icons/react';
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

      <div className={classes.dimensionAreas}>
        {section.areas.map((area) => (
          <div className={classes.dimensionAreaCard} key={area.id}>
            <div className={classes.dimensionAreaHeader}>
              <span className={classes.dimensionAreaTitle}>{area.title}</span>
              {area.onRemove ? (
                <button
                  type="button"
                  className={classes.dimensionAreaRemove}
                  onClick={area.onRemove}
                  aria-label={`Remove ${area.title.toLowerCase()}`}
                >
                  <Trash size={15} weight="bold" aria-hidden="true" />
                  Remove
                </button>
              ) : null}
            </div>

            <div className={classes.dimensionGrid}>
              {area.fields.map((dimensionField) => (
                <CalculatorDimensionField
                  key={`${dimensionField.key}-${dimensionField.inputUnitSystem}`}
                  field={dimensionField}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {section.canAddArea ? (
        <button
          type="button"
          className={classes.addDimensionArea}
          onClick={section.onAddArea}
        >
          <Plus size={15} weight="bold" aria-hidden="true" />
          {section.addAreaLabel}
        </button>
      ) : (
        <p className={classes.dimensionAreaLimit}>
          Maximum of {section.maxAreas} areas
        </p>
      )}
    </div>
  );
}
