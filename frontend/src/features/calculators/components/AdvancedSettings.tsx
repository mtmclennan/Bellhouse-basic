import type { CalculatorEditableNumber } from '../types/calculator';

type CalculatorStyleClasses = {
  fieldGroup: string;
  fieldGroupLabel: string;
  field: string;
  fieldControl: string;
  fieldNote: string;
  settingsNote: string;
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
      <p className={classes.settingsNote}>
        Use these only when the job needs extra hauling or material
        adjustments. Percent fields are converted automatically, and half-load
        mode changes truck-load estimates only.
      </p>

      {visibility.swellFactor && (
        <div className={classes.field}>
          <span>{labels.swellFactor}</span>
          <input
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0.01"
            value={values.swellFactor}
            onChange={(e) =>
              onSwellFactorChange(
                e.target.value === '' ? '' : Number(e.target.value),
              )
            }
            className={classes.fieldControl}
          />
          <p className={classes.fieldNote}>
            Example: `1.25` means the loose material takes up about 25% more
            space than the bank volume.
          </p>
        </div>
      )}

      {visibility.compactionPercentage && (
        <div className={classes.field}>
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
          <p className={classes.fieldNote}>
            Enter the extra percentage needed for compacted placement.
          </p>
        </div>
      )}

      {visibility.wetMaterialPercentage && (
        <div className={classes.field}>
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
          <p className={classes.fieldNote}>
            This moisture adjustment changes estimated tonnage only, not base
            volume.
          </p>
        </div>
      )}

      {visibility.truckCapacityTons && (
        <div className={classes.field}>
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
          <p className={classes.fieldNote}>
            Used for load-count estimates only. It does not change project
            volume or tonnage.
          </p>
        </div>
      )}

      {visibility.halfLoadToggle && (
        <div className={classes.fieldGroup}>
          <label className={classes.toggleCard}>
            <input
              type="checkbox"
              checked={values.isHalfLoad}
              onChange={(e) => onHalfLoadChange(e.target.checked)}
            />
            <span>{labels.halfLoadToggle}</span>
          </label>
          <p className={classes.fieldNote}>
            Applies a conservative 50% truck-payload assumption for road-legal
            hauling estimates only.
          </p>
        </div>
      )}
    </div>
  );
}
