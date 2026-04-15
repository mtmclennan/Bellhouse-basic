'use client';

import type { CalculatorAdvancedSection as CalculatorAdvancedSectionModel } from '../hooks/calculatorController.types';
import { AdvancedSettings } from './AdvancedSettings';
import { CalculatorAdvancedShell } from './CalculatorAdvancedShell';
import classes from './CalculatorForm.module.scss';

type CalculatorAdvancedSectionProps = {
  section: CalculatorAdvancedSectionModel;
};

const advancedSettingsClasses = {
  advancedFields: classes.advancedFields,
  advancedToggleGroup: classes.advancedToggleGroup,
  advancedActions: classes.advancedActions,
  resetButton: classes.resetButton,
  fieldGroupLabel: classes.fieldGroupLabel,
  field: classes.field,
  fieldControl: classes.fieldControl,
  selectControl: classes.selectControl,
  fieldNote: classes.fieldNote,
  toggleCard: classes.toggleCard,
};

export function CalculatorAdvancedSection({
  section,
}: CalculatorAdvancedSectionProps) {
  const content = section.content;

  if (content.mode === 'managed') {
    return (
      <CalculatorAdvancedShell shell={section.shell}>
        {content.statusMessage ? (
          <p className={classes.advancedPanelNote}>{content.statusMessage}</p>
        ) : null}
        <AdvancedSettings
          classes={advancedSettingsClasses}
          labels={content.fields.labels}
          visibility={content.fields.visibility}
          values={content.fields.values}
          onSwellFactorChange={content.fields.onSwellFactorChange}
          onMoistureLevelChange={content.fields.onMoistureLevelChange}
          onWetMaterialPercentageChange={
            content.fields.onWetMaterialPercentageChange
          }
          onCompactionPercentageChange={
            content.fields.onCompactionPercentageChange
          }
          onTruckCapacityTonsChange={content.fields.onTruckCapacityTonsChange}
          onHalfLoadChange={content.fields.onHalfLoadChange}
          onResetDefaults={content.fields.onResetDefaults}
        />
      </CalculatorAdvancedShell>
    );
  }

  return (
    <CalculatorAdvancedShell shell={section.shell}>
      <label className={classes.toggleCard}>
        <input
          type="checkbox"
          checked={content.enabled}
          onChange={(e) => content.onEnabledChange(e.target.checked)}
        />
        <span>{content.toggleLabel}</span>
      </label>
      {content.fields ? (
        <AdvancedSettings
          classes={advancedSettingsClasses}
          labels={content.fields.labels}
          visibility={content.fields.visibility}
          values={content.fields.values}
          onSwellFactorChange={content.fields.onSwellFactorChange}
          onMoistureLevelChange={content.fields.onMoistureLevelChange}
          onWetMaterialPercentageChange={
            content.fields.onWetMaterialPercentageChange
          }
          onCompactionPercentageChange={
            content.fields.onCompactionPercentageChange
          }
          onTruckCapacityTonsChange={content.fields.onTruckCapacityTonsChange}
          onHalfLoadChange={content.fields.onHalfLoadChange}
          onResetDefaults={content.fields.onResetDefaults}
        />
      ) : (
        <p className={classes.advancedPanelNote}>{content.inactiveMessage}</p>
      )}
    </CalculatorAdvancedShell>
  );
}
