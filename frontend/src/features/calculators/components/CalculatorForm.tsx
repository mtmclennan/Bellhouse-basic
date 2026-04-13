'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import { useMemo, useState } from 'react';
import SectionWrapper from '@/components/layout/SectionWrapper';
import {
  createCalculatorFormInput,
  getCalculatorConfig,
} from '../config/calculators';
import { getMaterialById, getMaterialsByIds } from '../config/materials';
import {
  calculateProjectMaterial,
  getMoistureLevelLabel,
  getMaterialDefaultAssumptions,
} from '../logic/calculator';
import { normalizeCalculatorInput } from '../logic/normalizeInput';
import { AdvancedSettings } from './AdvancedSettings';
import { CalculatorResults } from './CalculatorResults';
import { MetricImperialSwitch } from './MetricImperialSwitch';
import classes from './CalculatorForm.module.scss';
import type {
  CalculatorDimensionKey,
  CalculatorDimensionValueField,
  CalculatorEditableNumber,
  CalculatorFormInput,
  CalculatorKind,
  CalculatorNumberField,
  CalculatorSelectField,
  CalculatorToggleField,
  MetricDimensionUnit,
} from '../types/calculator';

type CalculatorFormProps = {
  kind: CalculatorKind;
};

function resolveEditablePositiveValue(
  value: CalculatorEditableNumber,
  fallback: number,
) {
  return typeof value === 'number' && Number.isFinite(value) && value > 0
    ? value
    : fallback;
}

function resolveEditableNonNegativeValue(
  value: CalculatorEditableNumber,
  fallback: number,
) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
    ? value
    : fallback;
}

export function CalculatorForm({ kind }: CalculatorFormProps) {
  const config = getCalculatorConfig(kind);

  const [input, setInput] = useState<CalculatorFormInput>(() =>
    createCalculatorFormInput(config),
  );
  const [hasExcavationManualOverrides, setHasExcavationManualOverrides] =
    useState(false);

  const allowedMaterials = useMemo(() => {
    return getMaterialsByIds(config.allowedMaterialIds);
  }, [config.allowedMaterialIds]);

  const material = getMaterialById(input.materialId);
  const excavationMaterialDefaults = useMemo(() => {
    if (kind !== 'excavation' || !material) {
      return null;
    }

    return getMaterialDefaultAssumptions(
      kind,
      material,
      config.defaults.truckCapacityTons,
    );
  }, [config.defaults.truckCapacityTons, kind, material]);

  const normalizedInput = useMemo(() => {
    return normalizeCalculatorInput(
      input,
      config,
      material,
    );
  }, [config, input, material]);

  const result = useMemo(() => {
    if (!material || !normalizedInput) return null;

    return calculateProjectMaterial(normalizedInput, material);
  }, [material, normalizedInput]);

  const excavationActiveSettings = useMemo(() => {
    if (!excavationMaterialDefaults) {
      return null;
    }

    const enteredTruckPayloadTons = resolveEditablePositiveValue(
      input.truckCapacityTons,
      excavationMaterialDefaults.truckCapacityTons,
    );
    const isHalfLoadActive = input.useAdvanced ? input.isHalfLoad : false;

    return {
      swellFactor: resolveEditablePositiveValue(
        input.swellFactor,
        excavationMaterialDefaults.swellFactor,
      ),
      moistureLevel: input.moistureLevel,
      compactionPercentage: input.useAdvanced
        ? resolveEditableNonNegativeValue(
            input.compactionPercentage,
            excavationMaterialDefaults.compactionPercentage,
          )
        : 0,
      truckCapacityTons: enteredTruckPayloadTons,
      effectiveTruckPayloadTons: isHalfLoadActive
        ? enteredTruckPayloadTons * 0.5
        : enteredTruckPayloadTons,
      isHalfLoad: isHalfLoadActive,
    };
  }, [
    excavationMaterialDefaults,
    input.compactionPercentage,
    input.isHalfLoad,
    input.moistureLevel,
    input.swellFactor,
    input.truckCapacityTons,
    input.useAdvanced,
  ]);

  const assumptions = useMemo(() => {
    if (kind !== 'excavation' || !material || !result || !excavationActiveSettings) {
      return null;
    }

    return {
      material: material.name,
      swellFactor: excavationActiveSettings.swellFactor,
      truckPayloadTons: excavationActiveSettings.effectiveTruckPayloadTons,
      isHalfLoad: excavationActiveSettings.isHalfLoad,
      moistureLevel: config.advancedSettings.moistureLevel
        ? getMoistureLevelLabel(excavationActiveSettings.moistureLevel)
        : undefined,
      compactionPercentage: excavationActiveSettings.compactionPercentage,
    };
  }, [
    config.advancedSettings.moistureLevel,
    excavationActiveSettings,
    kind,
    material,
    result,
  ]);

  const excavationAdvancedValues = useMemo(() => {
    if (kind !== 'excavation' || !excavationActiveSettings) {
      return null;
    }

    return {
      swellFactor: excavationActiveSettings.swellFactor,
      moistureLevel: excavationActiveSettings.moistureLevel,
      wetMaterialPercentage: input.wetMaterialPercentage,
      compactionPercentage: excavationActiveSettings.compactionPercentage,
      truckCapacityTons: excavationActiveSettings.truckCapacityTons,
      isHalfLoad: excavationActiveSettings.isHalfLoad,
    };
  }, [excavationActiveSettings, kind, input.wetMaterialPercentage]);

  const updateNumberField = (
    field: CalculatorNumberField,
    value: CalculatorEditableNumber,
  ) => {
    setInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateDimensionValueField = (
    dimension: CalculatorDimensionKey,
    field: CalculatorDimensionValueField,
    value: CalculatorEditableNumber,
  ) => {
    setInput((prev) => ({
      ...prev,
      [dimension]: {
        ...prev[dimension],
        [field]: value,
      },
    }));
  };

  const updateDimensionUnitField = (
    dimension: CalculatorDimensionKey,
    value: MetricDimensionUnit,
  ) => {
    setInput((prev) => ({
      ...prev,
      [dimension]: {
        ...prev[dimension],
        metricUnit: value,
      },
    }));
  };

  const updateToggleField = (
    field: CalculatorToggleField,
    value: boolean,
  ) => {
    setInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateExcavationAdvancedNumberField = (
    field: CalculatorNumberField,
    value: CalculatorEditableNumber,
  ) => {
    setHasExcavationManualOverrides(true);
    setInput((prev) => ({
      ...prev,
      useAdvanced: true,
      [field]: value,
    }));
  };

  const updateExcavationAdvancedToggleField = (
    field: CalculatorToggleField,
    value: boolean,
  ) => {
    setHasExcavationManualOverrides(true);
    setInput((prev) => ({
      ...prev,
      useAdvanced: true,
      [field]: value,
    }));
  };

  const updateExcavationAdvancedSelectField = <
    K extends Extract<CalculatorSelectField, 'moistureLevel'>
  >(
    field: K,
    value: CalculatorFormInput[K],
  ) => {
    setHasExcavationManualOverrides(true);
    setInput((prev) => ({
      ...prev,
      useAdvanced: true,
      [field]: value,
    }));
  };

  const updateSelectField = <K extends CalculatorSelectField>(
    field: K,
    value: CalculatorFormInput[K],
  ) => {
    setInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateMaterialSelection = (materialId: CalculatorFormInput['materialId']) => {
    setInput((prev) => {
      const nextMaterial = getMaterialById(materialId);

      if (!nextMaterial) {
        return {
          ...prev,
          materialId,
        };
      }

      const materialDefaults = getMaterialDefaultAssumptions(
        kind,
        nextMaterial,
        config.defaults.truckCapacityTons,
      );

      if (kind === 'excavation' && hasExcavationManualOverrides) {
        return {
          ...prev,
          materialId,
        };
      }

      return {
        ...prev,
        materialId,
        moistureLevel: materialDefaults.moistureLevel,
        swellFactor: materialDefaults.swellFactor,
        wetMaterialPercentage: config.advancedSettings.wetMaterialPercentage
          ? materialDefaults.wetMaterialPercentage
          : '',
        compactionPercentage: materialDefaults.compactionPercentage,
        truckCapacityTons: materialDefaults.truckCapacityTons,
        isHalfLoad: materialDefaults.isHalfLoad,
      };
    });
  };

  const resetExcavationMaterialDefaults = () => {
    if (kind !== 'excavation' || !material) {
      return;
    }

    const materialDefaults = getMaterialDefaultAssumptions(
      kind,
      material,
      config.defaults.truckCapacityTons,
    );

    setInput((prev) => ({
      ...prev,
      useAdvanced: false,
      moistureLevel: materialDefaults.moistureLevel,
      swellFactor: materialDefaults.swellFactor,
      wetMaterialPercentage: '',
      compactionPercentage: materialDefaults.compactionPercentage,
      truckCapacityTons: materialDefaults.truckCapacityTons,
      isHalfLoad: materialDefaults.isHalfLoad,
    }));
    setHasExcavationManualOverrides(false);
  };

  const updateInputUnitSystem = (
    nextUnitSystem: CalculatorFormInput['inputUnitSystem'],
  ) => {
    setInput((prev) => ({
      ...prev,
      inputUnitSystem: nextUnitSystem,
      outputUnitPreference:
        prev.outputUnitPreference === prev.inputUnitSystem
          ? nextUnitSystem
          : prev.outputUnitPreference,
    }));
  };

  const dimensionEntries = (
    ['length', 'width', 'depth'] as CalculatorDimensionKey[]
  ).map((dimensionKey) => ({
    key: dimensionKey,
    label: config.labels.dimensions[dimensionKey],
    behavior: config.dimensionBehavior[dimensionKey],
    value: input[dimensionKey],
  }));

  return (
    <SectionWrapper
      className={classes.section}
      containerClassName={classes.container}
      spacing="loose"
    >
      <div className={classes.shell}>
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
                onChange={updateInputUnitSystem}
                metricLabel={config.unitHints.metric}
                imperialLabel={config.unitHints.imperial}
              />
            </div>

            <div className={classes.fieldGroup}>
              <p className={classes.fieldGroupLabel}>Dimensions</p>

              <div className={classes.dimensionGrid}>
                {dimensionEntries.map((dimension) => (
                  <div className={classes.dimensionCard} key={dimension.key}>
                    <span className={classes.dimensionLabel}>
                      {dimension.label}
                    </span>

                    {input.inputUnitSystem === 'metric' ? (
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
                              e.target.value === ''
                                ? ''
                                : Number(e.target.value),
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
                    ) : dimension.behavior.imperialMode === 'feet-inches' ? (
                      <div className={classes.dimensionImperialRow}>
                        <label className={classes.subField}>
                          <span>Feet</span>
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
                                e.target.value === ''
                                  ? ''
                                  : Number(e.target.value),
                              )
                            }
                            className={classes.fieldControl}
                          />
                        </label>

                        <label className={classes.subField}>
                          <span>Inches</span>
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
                                e.target.value === ''
                                  ? ''
                                  : Number(e.target.value),
                              )
                            }
                            className={classes.fieldControl}
                          />
                        </label>
                      </div>
                    ) : (
                      <label className={classes.subField}>
                        <span>Inches</span>
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
                              e.target.value === ''
                                ? ''
                                : Number(e.target.value),
                            )
                          }
                          className={classes.fieldControl}
                        />
                      </label>
                    )}
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
                    updateMaterialSelection(
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
                    {kind === 'excavation' && excavationAdvancedValues ? (
                      <>
                        <p className={classes.advancedPanelNote}>
                          {hasExcavationManualOverrides
                            ? 'Manual overrides are active. Changing material keeps these values until you reset to material defaults.'
                            : 'Material changes load that material&apos;s defaults automatically until you edit these settings.'}
                        </p>
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
                          values={excavationAdvancedValues}
                          onSwellFactorChange={(value) =>
                            updateExcavationAdvancedNumberField('swellFactor', value)
                          }
                          onMoistureLevelChange={(value) =>
                            updateExcavationAdvancedSelectField('moistureLevel', value)
                          }
                          onWetMaterialPercentageChange={(value) =>
                            updateExcavationAdvancedNumberField('wetMaterialPercentage', value)
                          }
                          onCompactionPercentageChange={(value) =>
                            updateExcavationAdvancedNumberField('compactionPercentage', value)
                          }
                          onTruckCapacityTonsChange={(value) =>
                            updateExcavationAdvancedNumberField('truckCapacityTons', value)
                          }
                          onHalfLoadChange={(value) =>
                            updateExcavationAdvancedToggleField('isHalfLoad', value)
                          }
                          onResetDefaults={resetExcavationMaterialDefaults}
                        />
                      </>
                    ) : (
                      <>
                        <label className={classes.toggleCard}>
                          <input
                            type="checkbox"
                            checked={input.useAdvanced}
                            onChange={(e) =>
                              updateToggleField('useAdvanced', e.target.checked)
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
                              updateNumberField('swellFactor', value)
                            }
                            onMoistureLevelChange={(value) =>
                              updateSelectField('moistureLevel', value)
                            }
                            onWetMaterialPercentageChange={(value) =>
                              updateNumberField('wetMaterialPercentage', value)
                            }
                            onCompactionPercentageChange={(value) =>
                              updateNumberField('compactionPercentage', value)
                            }
                            onTruckCapacityTonsChange={(value) =>
                              updateNumberField('truckCapacityTons', value)
                            }
                            onHalfLoadChange={(value) =>
                              updateToggleField('isHalfLoad', value)
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

        <CalculatorResults
          result={result}
          outputUnitPreference={input.outputUnitPreference}
          onOutputUnitPreferenceChange={(value) =>
            updateSelectField('outputUnitPreference', value)
          }
          outputDisplayLabel={config.labels.resultDisplay}
          resultPresentation={config.resultPresentation}
          assumptions={assumptions}
          classes={{
            resultsPanel: classes.resultsPanel,
            resultsHeader: classes.resultsHeader,
            resultsHeaderTop: classes.resultsHeaderTop,
            resultsControls: classes.resultsControls,
            resultsBody: classes.resultsBody,
            placeholder: classes.placeholder,
            resultsPrimaryGrid: classes.resultsPrimaryGrid,
            resultsSecondary: classes.resultsSecondary,
            resultCard: classes.resultCard,
            resultCardPrimary: classes.resultCardPrimary,
            resultCardMuted: classes.resultCardMuted,
            resultLabel: classes.resultLabel,
            resultValue: classes.resultValue,
            resultValueSplit: classes.resultValueSplit,
            resultMeta: classes.resultMeta,
            assumptionsBlock: classes.assumptionsBlock,
            assumptionsGrid: classes.assumptionsGrid,
            assumptionItem: classes.assumptionItem,
            assumptionLabel: classes.assumptionLabel,
            assumptionValue: classes.assumptionValue,
            resultDisclaimer: classes.resultDisclaimer,
          }}
        />
      </div>
    </SectionWrapper>
  );
}
