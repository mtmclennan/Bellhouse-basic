'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import type {
  CalculatorFormInput,
  MetricDimensionUnit,
} from '../types/calculator';
import { AdvancedSettings } from './AdvancedSettings';
import { MetricImperialSwitch } from './MetricImperialSwitch';
import classes from './CalculatorForm.module.scss';
import type {
  CalculatorController,
  CalculatorDimensionEntry,
} from '../hooks/calculatorController.types';

type CalculatorInputPanelProps = {
  controller: CalculatorController;
};

type DimensionInputFieldsProps = {
  dimension: CalculatorDimensionEntry;
  inputUnitSystem: CalculatorFormInput['inputUnitSystem'];
  updateDimensionValueField: CalculatorController['actions']['updateDimensionValueField'];
  updateDimensionUnitField: CalculatorController['actions']['updateDimensionUnitField'];
};

function DimensionInputFields({
  dimension,
  inputUnitSystem,
  updateDimensionValueField,
  updateDimensionUnitField,
}: DimensionInputFieldsProps) {
  if (inputUnitSystem === 'metric') {
    return (
      <div className={classes.dimensionMetricRow}>
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step="any"
          value={dimension.value.metricValue}
          onChange={(e) =>
            updateDimensionValueField(
              dimension.key,
              'metricValue',
              e.target.value === '' ? '' : Number(e.target.value),
            )
          }
          className={classes.fieldControl}
        />

        <select
          value={dimension.value.metricUnit}
          onChange={(e) =>
            updateDimensionUnitField(
              dimension.key,
              e.target.value as MetricDimensionUnit,
            )
          }
          className={`${classes.selectControl} ${classes.dimensionUnitSelect}`}
        >
          {dimension.behavior.metricUnits.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (dimension.behavior.imperialMode === 'feet-inches') {
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
              value={dimension.value.feet}
              onChange={(e) =>
                updateDimensionValueField(
                  dimension.key,
                  'feet',
                  e.target.value === '' ? '' : Number(e.target.value),
                )
              }
              className={`${classes.fieldControl} ${classes.dimensionFieldControl}`}
              aria-label={`${dimension.label} feet`}
            />
          </label>

          <label className={`${classes.subField} ${classes.subFieldGrouped}`}>
            <span className={classes.subFieldLabel}>in</span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={dimension.value.inches}
              onChange={(e) =>
                updateDimensionValueField(
                  dimension.key,
                  'inches',
                  e.target.value === '' ? '' : Number(e.target.value),
                )
              }
              className={`${classes.fieldControl} ${classes.dimensionFieldControl}`}
              aria-label={`${dimension.label} inches`}
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
          value={dimension.value.inches}
          onChange={(e) =>
            updateDimensionValueField(
              dimension.key,
              'inches',
              e.target.value === '' ? '' : Number(e.target.value),
            )
          }
          className={`${classes.fieldControl} ${classes.dimensionFieldControl}`}
          aria-label={`${dimension.label} inches`}
        />
      </label>
    </div>
  );
}

export function CalculatorInputPanel({ controller }: CalculatorInputPanelProps) {
  const {
    config,
    state: { input },
    options: { allowedMaterials, dimensionEntries },
    advanced,
    actions,
  } = controller;

  const managedAdvancedValues = advanced.values;

  return (
    <div className={classes.panel}>
      <div className={classes.panelHeader}>
        <h2>Inputs</h2>
      </div>

      <div className={classes.formBody}>
        <div className={classes.fieldGroup}>
          <p className={classes.fieldGroupLabel}>Units</p>

          <MetricImperialSwitch
            label={config.labels.inputUnits}
            value={input.inputUnitSystem}
            onChange={actions.updateInputUnitSystem}
            metricLabel={config.unitHints.metric}
            imperialLabel={config.unitHints.imperial}
          />
        </div>

        <div className={`${classes.fieldGroup} ${classes.fieldGroupPrimary}`}>
          <p className={classes.fieldGroupLabel}>Dimensions</p>

          <div className={classes.dimensionGrid}>
            {dimensionEntries.map((dimension) => (
              <div className={classes.dimensionCard} key={dimension.key}>
                <span className={classes.dimensionLabel}>{dimension.label}</span>
                <DimensionInputFields
                  dimension={dimension}
                  inputUnitSystem={input.inputUnitSystem}
                  updateDimensionValueField={actions.updateDimensionValueField}
                  updateDimensionUnitField={actions.updateDimensionUnitField}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={classes.fieldGroup}>
          <p className={classes.fieldGroupLabel}>Material</p>

          <label className={classes.field}>
            <span>{config.labels.material}</span>
            <select
              value={input.materialId}
              onChange={(e) =>
                actions.updateMaterialSelection(
                  e.target.value as CalculatorFormInput['materialId'],
                )
              }
              className={classes.selectControl}
            >
              {allowedMaterials.map((materialOption) => (
                <option key={materialOption.id} value={materialOption.id}>
                  {materialOption.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <Disclosure>
          {({ open }) => (
            <div className={classes.advancedSection}>
              <DisclosureButton className={classes.advancedTrigger}>
                <div className={classes.advancedTriggerCopy}>
                  <span className={classes.fieldGroupLabel}>Advanced Options</span>
                  <p className={classes.advancedTriggerNote}>
                    Swell, moisture, compaction, and hauling overrides.
                  </p>
                </div>
                <CaretDown
                  size={18}
                  weight="bold"
                  className={`${classes.advancedTriggerIcon} ${
                    open ? classes.advancedTriggerIconOpen : ''
                  }`}
                />
              </DisclosureButton>

              <DisclosurePanel className={classes.advancedPanel}>
                {managedAdvancedValues ? (
                  <>
                    {advanced.statusMessage ? (
                      <p className={classes.advancedPanelNote}>
                        {advanced.statusMessage}
                      </p>
                    ) : null}
                    <AdvancedSettings
                      classes={{
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
                      }}
                      labels={config.labels.advanced}
                      visibility={config.advancedSettings}
                      values={managedAdvancedValues}
                      onSwellFactorChange={(value) =>
                        actions.updateAdvancedNumberField('swellFactor', value)
                      }
                      onMoistureLevelChange={(value) =>
                        actions.updateAdvancedSelectField('moistureLevel', value)
                      }
                      onWetMaterialPercentageChange={(value) =>
                        actions.updateAdvancedNumberField('wetMaterialPercentage', value)
                      }
                      onCompactionPercentageChange={(value) =>
                        actions.updateAdvancedNumberField('compactionPercentage', value)
                      }
                      onTruckCapacityTonsChange={(value) =>
                        actions.updateAdvancedNumberField('truckCapacityTons', value)
                      }
                      onHalfLoadChange={(value) =>
                        actions.updateAdvancedToggleField('isHalfLoad', value)
                      }
                      onResetDefaults={
                        advanced.canResetToMaterialDefaults
                          ? actions.resetMaterialDefaults
                          : undefined
                      }
                    />
                  </>
                ) : (
                  <>
                    <label className={classes.toggleCard}>
                      <input
                        type="checkbox"
                        checked={input.useAdvanced}
                        onChange={(e) =>
                          actions.updateToggleField('useAdvanced', e.target.checked)
                        }
                      />
                      <span>{config.labels.useAdvanced}</span>
                    </label>
                    {input.useAdvanced ? (
                      <AdvancedSettings
                        classes={{
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
                        }}
                        labels={config.labels.advanced}
                        visibility={config.advancedSettings}
                        values={{
                          swellFactor: input.swellFactor,
                          moistureLevel: input.moistureLevel,
                          wetMaterialPercentage: input.wetMaterialPercentage,
                          compactionPercentage: input.compactionPercentage,
                          truckCapacityTons: input.truckCapacityTons,
                          isHalfLoad: input.isHalfLoad,
                        }}
                        onSwellFactorChange={(value) =>
                          actions.updateNumberField('swellFactor', value)
                        }
                        onMoistureLevelChange={(value) =>
                          actions.updateSelectField('moistureLevel', value)
                        }
                        onWetMaterialPercentageChange={(value) =>
                          actions.updateNumberField('wetMaterialPercentage', value)
                        }
                        onCompactionPercentageChange={(value) =>
                          actions.updateNumberField('compactionPercentage', value)
                        }
                        onTruckCapacityTonsChange={(value) =>
                          actions.updateNumberField('truckCapacityTons', value)
                        }
                        onHalfLoadChange={(value) =>
                          actions.updateToggleField('isHalfLoad', value)
                        }
                      />
                    ) : (
                      <p className={classes.advancedPanelNote}>
                        Turn on advanced options to adjust swell, moisture,
                        compaction, truck payload, and half-load mode.
                      </p>
                    )}
                  </>
                )}
              </DisclosurePanel>
            </div>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
