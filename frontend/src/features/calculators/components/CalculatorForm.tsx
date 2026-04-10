'use client';

import { useMemo, useState } from 'react';
import SectionWrapper from '@/components/layout/SectionWrapper';
import {
  createCalculatorFormInput,
  getCalculatorConfig,
} from '../config/calculators';
import { getMaterialById, getMaterialsByIds } from '../config/materials';
import { calculateProjectMaterial } from '../logic/calculator';
import { normalizeCalculatorInput } from '../logic/normalizeInput';
import { AdvancedSettings } from './AdvancedSettings';
import { CalculatorResults } from './CalculatorResults';
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

export function CalculatorForm({ kind }: CalculatorFormProps) {
  const config = getCalculatorConfig(kind);

  const [input, setInput] = useState<CalculatorFormInput>(() =>
    createCalculatorFormInput(config),
  );

  const allowedMaterials = useMemo(() => {
    return getMaterialsByIds(config.allowedMaterialIds);
  }, [config.allowedMaterialIds]);

  const material = getMaterialById(input.materialId);

  const result = useMemo(() => {
    if (!material) return null;

    const normalizedInput = normalizeCalculatorInput(
      input,
      config.dimensionBehavior,
    );
    if (!normalizedInput) return null;

    return calculateProjectMaterial(normalizedInput, material);
  }, [config.dimensionBehavior, input, material]);

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

  const updateSelectField = <K extends CalculatorSelectField>(
    field: K,
    value: CalculatorFormInput[K],
  ) => {
    setInput((prev) => ({
      ...prev,
      [field]: value,
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
      <div className={classes.intro}>
        <h1>{config.title}</h1>
        <p>{config.description}</p>
      </div>

      <div className={classes.shell}>
        <div className={classes.panel}>
          <div className={classes.panelHeader}>
            <h2>Project Inputs</h2>
            <p>
              Enter field measurements in the format that makes the job easiest
              to estimate, then review the output in the units you want.
            </p>
          </div>

          <div className={classes.formBody}>
            <div className={classes.fieldGroup}>
              <p className={classes.fieldGroupLabel}>Units</p>

              <label className={classes.field}>
                <span>{config.labels.inputUnits}</span>
                <select
                  value={input.inputUnitSystem}
                  onChange={(e) =>
                    updateSelectField(
                      'inputUnitSystem',
                      e.target.value as CalculatorFormInput['inputUnitSystem'],
                    )
                  }
                  className={classes.selectControl}
                >
                  <option value="metric">{config.unitHints.metric}</option>
                  <option value="imperial">{config.unitHints.imperial}</option>
                </select>
              </label>

              <p className={classes.unitHint}>
                Input units stay here in the project-input section. Result
                display is controlled in the results panel so it does not affect
                how you enter measurements.
              </p>
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

              <p className={classes.dimensionHint}>
                Metric dimensions use one value and one unit selector. Imperial
                entry uses feet and inches where it makes the most sense for the
                calculator.
              </p>
            </div>

            <div className={classes.fieldGroup}>
              <p className={classes.fieldGroupLabel}>Material</p>

              <label className={classes.field}>
                <span>{config.labels.material}</span>
                <select
                  value={input.materialId}
                  onChange={(e) =>
                    updateSelectField(
                      'materialId',
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

              <p className={classes.materialNote}>
                Only materials relevant to this calculator are shown to keep the
                estimate focused and easier to use on site.
              </p>
            </div>

            <label className={classes.toggleCard}>
              <input
                type="checkbox"
                checked={input.useAdvanced}
                onChange={(e) => updateToggleField('useAdvanced', e.target.checked)}
              />
              <span>{config.labels.useAdvanced}</span>
            </label>

            {input.useAdvanced && (
              <AdvancedSettings
                classes={{
                  fieldGroup: classes.fieldGroup,
                  fieldGroupLabel: classes.fieldGroupLabel,
                  field: classes.field,
                  fieldControl: classes.fieldControl,
                  fieldNote: classes.fieldNote,
                  settingsNote: classes.settingsNote,
                  toggleCard: classes.toggleCard,
                }}
                labels={config.labels.advanced}
                visibility={config.advancedSettings}
                values={{
                  swellFactor: input.swellFactor,
                  wetMaterialPercentage: input.wetMaterialPercentage,
                  compactionPercentage: input.compactionPercentage,
                  truckCapacityTons: input.truckCapacityTons,
                  isHalfLoad: input.isHalfLoad,
                }}
                onSwellFactorChange={(value) =>
                  updateNumberField('swellFactor', value)
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
                onHalfLoadChange={(value) => updateToggleField('isHalfLoad', value)}
              />
            )}
          </div>
        </div>

        <CalculatorResults
          result={result}
          inputUnitSystem={input.inputUnitSystem}
          outputUnitPreference={input.outputUnitPreference}
          onOutputUnitPreferenceChange={(value) =>
            updateSelectField('outputUnitPreference', value)
          }
          outputDisplayLabel={config.labels.resultDisplay}
          availableOutputUnitPreferences={config.resultDisplay.options}
          classes={{
            resultsPanel: classes.resultsPanel,
            resultsHeader: classes.resultsHeader,
            resultsHeaderTop: classes.resultsHeaderTop,
            resultsControls: classes.resultsControls,
            resultsBody: classes.resultsBody,
            resultsIntro: classes.resultsIntro,
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
            resultDisclaimer: classes.resultDisclaimer,
          }}
        />
      </div>
    </SectionWrapper>
  );
}
