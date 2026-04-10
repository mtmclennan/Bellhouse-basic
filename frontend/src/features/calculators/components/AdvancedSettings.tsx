import type { CalculatorEditableNumber } from '../types/calculator';

type CalculatorStyleClasses = {
  fieldGroup: string;
  fieldGroupLabel: string;
  field: string;
  fieldControl: string;
  toggleCard: string;
};

type AdvancedSettingsProps = {
  classes: CalculatorStyleClasses;
  labels: {
    swellFactor: string;
    wetMaterialPercentage: string;
    compactionPercentage: string;
    truckCapacityTons: string;
    halfLoadToggle: string;
  };
  visibility: {
    swellFactor: boolean;
    wetMaterialPercentage: boolean;
    compactionPercentage: boolean;
    truckCapacityTons: boolean;
    halfLoadToggle: boolean;
  };
  values: {
    swellFactor: CalculatorEditableNumber;
    wetMaterialPercentage: CalculatorEditableNumber;
    compactionPercentage: CalculatorEditableNumber;
    truckCapacityTons: CalculatorEditableNumber;
    isHalfLoad: boolean;
  };
  onSwellFactorChange: (value: CalculatorEditableNumber) => void;
  onWetMaterialPercentageChange: (value: CalculatorEditableNumber) => void;
  onCompactionPercentageChange: (value: CalculatorEditableNumber) => void;
  onTruckCapacityTonsChange: (value: CalculatorEditableNumber) => void;
  onHalfLoadChange: (value: boolean) => void;
};

export function AdvancedSettings({
  classes,
  labels,
  visibility,
  values,
  onSwellFactorChange,
  onWetMaterialPercentageChange,
  onCompactionPercentageChange,
  onTruckCapacityTonsChange,
  onHalfLoadChange,
}: AdvancedSettingsProps) {
  return (
    <div className={classes.fieldGroup}>
      <p className={classes.fieldGroupLabel}>Advanced Settings</p>

      {visibility.swellFactor && (
        <label className={classes.field}>
          <span>{labels.swellFactor}</span>
          <input
            type="number"
            inputMode="decimal"
            step="0.01"
            value={values.swellFactor}
            onChange={(e) =>
              onSwellFactorChange(
                e.target.value === '' ? '' : Number(e.target.value),
              )
            }
            className={classes.fieldControl}
          />
        </label>
      )}

      {visibility.compactionPercentage && (
        <label className={classes.field}>
          <span>{labels.compactionPercentage}</span>
          <input
            type="number"
            inputMode="decimal"
            step="0.1"
            min="0"
            value={values.compactionPercentage}
            onChange={(e) =>
              onCompactionPercentageChange(
                e.target.value === '' ? '' : Number(e.target.value),
              )
            }
            className={classes.fieldControl}
          />
        </label>
      )}

      {visibility.wetMaterialPercentage && (
        <label className={classes.field}>
          <span>{labels.wetMaterialPercentage}</span>
          <input
            type="number"
            inputMode="decimal"
            step="0.1"
            min="0"
            value={values.wetMaterialPercentage}
            onChange={(e) =>
              onWetMaterialPercentageChange(
                e.target.value === '' ? '' : Number(e.target.value),
              )
            }
            className={classes.fieldControl}
          />
        </label>
      )}

      {visibility.truckCapacityTons && (
        <label className={classes.field}>
          <span>{labels.truckCapacityTons}</span>
          <input
            type="number"
            inputMode="decimal"
            step="0.1"
            min="0.1"
            value={values.truckCapacityTons}
            onChange={(e) =>
              onTruckCapacityTonsChange(
                e.target.value === '' ? '' : Number(e.target.value),
              )
            }
            className={classes.fieldControl}
          />
        </label>
      )}

      {visibility.halfLoadToggle && (
        <label className={classes.toggleCard}>
          <input
            type="checkbox"
            checked={values.isHalfLoad}
            onChange={(e) => onHalfLoadChange(e.target.checked)}
          />
          <span>{labels.halfLoadToggle}</span>
        </label>
      )}
    </div>
  );
}
