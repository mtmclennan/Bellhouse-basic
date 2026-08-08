'use client';

import { useId, useState, type FocusEvent } from 'react';
import type { MetricDimensionUnit } from '../types/calculator';
import type { CalculatorDimensionFieldModel } from '../hooks/calculatorController.types';
import classes from './CalculatorForm.module.scss';

type CalculatorDimensionFieldProps = {
  field: CalculatorDimensionFieldModel;
};

export function CalculatorDimensionField({ field }: CalculatorDimensionFieldProps) {
  const [isTouched, setIsTouched] = useState(false);
  const errorId = useId();
  const isPositive = (value: number | '') =>
    typeof value === 'number' && Number.isFinite(value) && value > 0;
  const hasValidValue =
    field.inputUnitSystem === 'metric'
      ? isPositive(field.value.metricValue)
      : field.behavior.imperialMode === 'feet-inches'
        ? isPositive(field.value.feet) || isPositive(field.value.inches)
        : isPositive(field.value.inches);
  const showError = isTouched && !hasValidValue;
  const validationProps = {
    'aria-invalid': showError,
    'aria-describedby': showError ? errorId : undefined,
  };
  const handleCompoundBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsTouched(true);
    }
  };

  const renderInputs = () => {
    if (field.inputUnitSystem === 'metric') {
      return (
        <div
          className={`${classes.dimensionCompound} ${classes.dimensionMetricCompound}`}
          onBlurCapture={handleCompoundBlur}
        >
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            placeholder="0"
            value={field.value.metricValue}
            onChange={(e) =>
              field.onValueChange(
                'metricValue',
                e.target.value === '' ? '' : Number(e.target.value),
              )
            }
            className={classes.dimensionBareInput}
            aria-label={field.label}
            {...validationProps}
          />

          <select
            value={field.value.metricUnit}
            onChange={(e) =>
              field.onUnitChange(e.target.value as MetricDimensionUnit)
            }
            className={`${classes.dimensionUnitSelectCompact} ${classes.dimensionUnitSelect}`}
            aria-label={`${field.label} unit`}
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
        <div
          className={`${classes.dimensionCompound} ${classes.dimensionImperialCompound}`}
          onBlurCapture={handleCompoundBlur}
        >
          <div className={classes.dimensionCompoundSegment}>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="1"
              placeholder="0"
              value={field.value.feet}
              onChange={(e) =>
                field.onValueChange(
                  'feet',
                  e.target.value === '' ? '' : Number(e.target.value),
                )
              }
              className={classes.dimensionBareInput}
              aria-label={`${field.label} feet`}
              {...validationProps}
            />
            <span className={classes.dimensionSuffix}>ft</span>
          </div>

          <div
            className={`${classes.dimensionCompoundSegment} ${classes.dimensionCompoundSegmentDivider}`}
          >
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              max="11"
              placeholder="0"
              value={field.value.inches}
              onChange={(e) =>
                field.onValueChange(
                  'inches',
                  e.target.value === '' ? '' : Number(e.target.value),
                )
              }
              className={classes.dimensionBareInput}
              aria-label={`${field.label} inches`}
              {...validationProps}
            />
            <span className={classes.dimensionSuffix}>in</span>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`${classes.dimensionCompound} ${classes.dimensionSingleCompound}`}
        onBlurCapture={handleCompoundBlur}
      >
        <div className={classes.dimensionCompoundSegment}>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            placeholder="0"
            value={field.value.inches}
            onChange={(e) =>
              field.onValueChange(
                'inches',
                e.target.value === '' ? '' : Number(e.target.value),
              )
            }
            className={classes.dimensionBareInput}
            aria-label={`${field.label} inches`}
            {...validationProps}
          />
          <span className={classes.dimensionSuffix}>in</span>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`${classes.dimensionCard} ${
        showError ? classes.dimensionCardError : ''
      }`}
    >
      <span className={classes.dimensionLabel}>{field.label}</span>
      {renderInputs()}
      {showError ? (
        <span id={errorId} className={classes.dimensionErrorMessage}>
          Enter a value greater than 0.
        </span>
      ) : null}
    </div>
  );
}
