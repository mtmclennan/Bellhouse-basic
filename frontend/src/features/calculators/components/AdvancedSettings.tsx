import type {
  CalculatorEditableNumber,
  MoistureLevel,
} from '../types/calculator';

type CalculatorStyleClasses = {
  advancedFields: string;
  advancedToggleGroup: string;
  advancedActions: string;
  resetButton: string;
  fieldGroupLabel: string;
  field: string;
  fieldControl: string;
  selectControl: string;
  fieldNote: string;
  toggleCard: string;
};

type AdvancedSettingsProps = {
  classes: CalculatorStyleClasses;
  labels: {
    swellFactor: string;
    moistureLevel: string;
    wetMaterialPercentage: string;
    compactionPercentage: string;
    truckCapacityTons: string;
    halfLoadToggle: string;
  };
  visibility: {
    swellFactor: boolean;
    moistureLevel: boolean;
    wetMaterialPercentage: boolean;
    compactionPercentage: boolean;
    truckCapacityTons: boolean;
    halfLoadToggle: boolean;
  };
  values: {
    swellFactor: CalculatorEditableNumber;
    moistureLevel: MoistureLevel;
    wetMaterialPercentage: CalculatorEditableNumber;
    compactionPercentage: CalculatorEditableNumber;
    truckCapacityTons: CalculatorEditableNumber;
    isHalfLoad: boolean;
  };
  onSwellFactorChange: (value: CalculatorEditableNumber) => void;
  onMoistureLevelChange: (value: MoistureLevel) => void;
  onWetMaterialPercentageChange: (value: CalculatorEditableNumber) => void;
  onCompactionPercentageChange: (value: CalculatorEditableNumber) => void;
  onTruckCapacityTonsChange: (value: CalculatorEditableNumber) => void;
  onHalfLoadChange: (value: boolean) => void;
  onResetDefaults?: () => void;
};

export function AdvancedSettings({
  classes,
  labels,
  visibility,
  values,
  onSwellFactorChange,
  onMoistureLevelChange,
  onWetMaterialPercentageChange,
  onCompactionPercentageChange,
  onTruckCapacityTonsChange,
  onHalfLoadChange,
  onResetDefaults,
}: AdvancedSettingsProps) {
  return (
    <div className={classes.advancedFields}>
      {visibility.swellFactor && (
        <div className={classes.field}>
          <label htmlFor="advanced-swell-factor">{labels.swellFactor}</label>
          <input
            id="advanced-swell-factor"
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
          <p className={classes.fieldNote}>Adjusts loose material quantity.</p>
        </div>
      )}

      {visibility.compactionPercentage && (
        <div className={classes.field}>
          <label htmlFor="advanced-compaction-percentage">
            {labels.compactionPercentage}
          </label>
          <input
            id="advanced-compaction-percentage"
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
          <p className={classes.fieldNote}>Adjusts compacted quantity.</p>
        </div>
      )}

      {visibility.moistureLevel && (
        <div className={classes.field}>
          <label htmlFor="advanced-moisture-level">{labels.moistureLevel}</label>
          <select
            id="advanced-moisture-level"
            value={values.moistureLevel}
            onChange={(e) => onMoistureLevelChange(e.target.value as MoistureLevel)}
            className={classes.selectControl}
          >
            <option value="dry">Dry</option>
            <option value="normal">Normal</option>
            <option value="wet">Wet</option>
          </select>
          <p className={classes.fieldNote}>Affects weight only.</p>
        </div>
      )}

      {visibility.wetMaterialPercentage && (
        <div className={classes.field}>
          <label htmlFor="advanced-wet-material-percentage">
            {labels.wetMaterialPercentage}
          </label>
          <input
            id="advanced-wet-material-percentage"
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
          <p className={classes.fieldNote}>Affects weight only.</p>
        </div>
      )}

      {visibility.truckCapacityTons && (
        <div className={classes.field}>
          <label htmlFor="advanced-truck-capacity-tons">
            {labels.truckCapacityTons}
          </label>
          <input
            id="advanced-truck-capacity-tons"
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
          <p className={classes.fieldNote}>Used for load estimates.</p>
        </div>
      )}

      {visibility.halfLoadToggle && (
        <div className={classes.advancedToggleGroup}>
          <label className={classes.toggleCard}>
            <input
              type="checkbox"
              checked={values.isHalfLoad}
              onChange={(e) => onHalfLoadChange(e.target.checked)}
            />
            <span>{labels.halfLoadToggle}</span>
          </label>
          <p className={classes.fieldNote}>Cuts legal payload in half.</p>
        </div>
      )}

      {onResetDefaults ? (
        <div className={classes.advancedActions}>
          <button
            type="button"
            className={classes.resetButton}
            onClick={onResetDefaults}
          >
            Reset to material defaults
          </button>
        </div>
      ) : null}
    </div>
  );
}
