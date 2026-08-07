'use client';

import type { MetricDimensionUnit } from '../types/calculator';
import type { CalculatorDimensionFieldModel } from '../hooks/calculatorController.types';
import classes from './CalculatorForm.module.scss';

type CalculatorDimensionFieldProps = {
  field: CalculatorDimensionFieldModel;
};

export function CalculatorDimensionField({ field }: CalculatorDimensionFieldProps) {
  const renderInputs = () => {
    if (field.inputUnitSystem === 'metric') {
      return (
        <div className={classes.dimensionMetricRow}>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={field.value.metricValue}
            onChange={(e) =>
              field.onValueChange(
                'metricValue',
                e.target.value === '' ? '' : Number(e.target.value),
              )
            }
            className={classes.fieldControl}
            aria-label={field.label}
          />

          <select
            value={field.value.metricUnit}
            onChange={(e) =>
              field.onUnitChange(e.target.value as MetricDimensionUnit)
            }
            className={`${classes.selectControl} ${classes.dimensionUnitSelect}`}
          >
            {field.behavior.metricUnits.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (field.behavior.imperialMode === 'feet-inches') {
      return (
        <div className={classes.dimensionImperialGroup}>
          <div className={classes.dimensionImperialRow}>
            <label className={`${classes.subField} ${classes.subFieldGrouped}`}>
              <span className={classes.subFieldLabel}>ft</span>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="1"
                value={field.value.feet}
                onChange={(e) =>
                  field.onValueChange(
                    'feet',
                    e.target.value === '' ? '' : Number(e.target.value),
                  )
                }
                className={`${classes.fieldControl} ${classes.dimensionFieldControl}`}
                aria-label={`${field.label} feet`}
              />
            </label>

            <label className={`${classes.subField} ${classes.subFieldGrouped}`}>
              <span className={classes.subFieldLabel}>in</span>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={field.value.inches}
                onChange={(e) =>
                  field.onValueChange(
                    'inches',
                    e.target.value === '' ? '' : Number(e.target.value),
                  )
                }
                className={`${classes.fieldControl} ${classes.dimensionFieldControl}`}
                aria-label={`${field.label} inches`}
              />
            </label>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`${classes.dimensionImperialGroup} ${classes.dimensionImperialGroupSingle}`}
      >
        <label className={`${classes.subField} ${classes.subFieldGrouped}`}>
          <span className={classes.subFieldLabel}>in</span>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={field.value.inches}
            onChange={(e) =>
              field.onValueChange(
                'inches',
                e.target.value === '' ? '' : Number(e.target.value),
              )
            }
            className={`${classes.fieldControl} ${classes.dimensionFieldControl}`}
            aria-label={`${field.label} inches`}
          />
        </label>
      </div>
    );
  };

  return (
    <div className={classes.dimensionCard}>
      <span className={classes.dimensionLabel}>{field.label}</span>
      {renderInputs()}
    </div>
  );
}
