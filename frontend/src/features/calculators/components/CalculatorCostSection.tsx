'use client';

import { CurrencyDollar } from '@phosphor-icons/react';
import type { CalculatorCostSection as CalculatorCostSectionModel } from '../hooks/calculatorController.types';
import classes from './CalculatorForm.module.scss';

type CalculatorCostSectionProps = {
  section: CalculatorCostSectionModel;
};

export function CalculatorCostSection({ section }: CalculatorCostSectionProps) {
  return (
    <div className={`${classes.fieldGroup} ${classes.costSection}`}>
      <div className={classes.costSectionHeading}>
        <CurrencyDollar size={15} weight="fill" aria-hidden="true" />
        <span>{section.title}</span>
        <span className={classes.costOptional}>(optional)</span>
      </div>

      <div className={classes.costControls}>
        <label className={classes.costInputWrap}>
          <span className={classes.costPrefix}>$</span>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            placeholder="0"
            value={section.value}
            onChange={(event) =>
              section.onValueChange(
                event.target.value === '' ? '' : Number(event.target.value),
              )
            }
            className={classes.costInput}
            aria-label="Price amount"
          />
        </label>

        <div className={classes.costModeToggle} role="group" aria-label="Price per unit">
          <button
            type="button"
            className={`${classes.costModeButton} ${
              section.mode === 'load' ? classes.costModeButtonActive : ''
            }`}
            aria-pressed={section.mode === 'load'}
            onClick={() => section.onModeChange('load')}
          >
            load
          </button>
          <button
            type="button"
            className={`${classes.costModeButton} ${
              section.mode === 'volume' ? classes.costModeButtonActive : ''
            }`}
            aria-pressed={section.mode === 'volume'}
            onClick={() => section.onModeChange('volume')}
          >
            {section.volumeUnitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
