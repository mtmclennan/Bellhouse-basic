'use client';

import { useMemo, useState } from 'react';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { calculatorConfigs } from '../config/calculators';
import { getMaterialById, getMaterialsByIds } from '../config/materials';
import { calculateProjectMaterial } from '../logic/calculator';
import { normalizeCalculatorInput } from '../logic/normalizeInput';
import { AdvancedSettings } from './AdvancedSettings';
import { CalculatorResults } from './CalculatorResults';
import classes from './CalculatorForm.module.scss';
import type {
  CalculatorEditableNumber,
  CalculatorFormInput,
  CalculatorKind,
  CalculatorNumberField,
  CalculatorSelectField,
  CalculatorToggleField,
} from '../types/calculator';

type CalculatorFormProps = {
  kind: CalculatorKind;
};

export function CalculatorForm({ kind }: CalculatorFormProps) {
  const config = calculatorConfigs[kind];

  const [input, setInput] = useState<CalculatorFormInput>({
    length: '',
    width: '',
    depth: '',
    inputUnitSystem: config.defaults.inputUnitSystem,
    outputUnitPreference: config.defaults.outputUnitPreference,
    materialId: config.defaults.materialId,
    useAdvanced: false,
    swellFactor: '',
    wetMaterialPercentage: '',
    compactionPercentage: '',
    isHalfLoad: false,
    truckCapacityTons: config.defaults.truckCapacityTons,
  });

  const allowedMaterials = useMemo(() => {
    return getMaterialsByIds(config.allowedMaterialIds);
  }, [config.allowedMaterialIds]);

  const material = getMaterialById(input.materialId);
  const dimensionUnits =
    input.inputUnitSystem === 'metric'
      ? { length: 'm', width: 'm', depth: 'm' }
      : { length: 'ft', width: 'ft', depth: 'in' };

  const result = useMemo(() => {
    if (!material) return null;

    const normalizedInput = normalizeCalculatorInput(input);
    if (!normalizedInput) return null;

    return calculateProjectMaterial(normalizedInput, material);
  }, [input, material]);

  const updateNumberField = (
    field: CalculatorNumberField,
    value: CalculatorEditableNumber,
  ) => {
    setInput((prev) => ({
      ...prev,
      [field]: value,
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
              Enter dimensions, choose the material, and adjust the advanced
              settings only if the job needs them.
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

              <label className={classes.field}>
                <span>{config.labels.outputUnits}</span>
                <select
                  value={input.outputUnitPreference}
                  onChange={(e) =>
                    updateSelectField(
                      'outputUnitPreference',
                      e.target.value as CalculatorFormInput['outputUnitPreference'],
                    )
                  }
                  className={classes.selectControl}
                >
                  <option value="metric">Metric only</option>
                  <option value="imperial">Imperial only</option>
                  <option value="both">Metric and imperial</option>
                </select>
              </label>

              <p className={classes.unitHint}>
                Input units and output units are separate, so you can enter
                field measurements one way and review results another way.
              </p>
            </div>

            <div className={classes.fieldGroup}>
              <p className={classes.fieldGroupLabel}>Dimensions</p>

              <div className={classes.dimensionGrid}>
                <label className={classes.field}>
                  <span>
                    {config.labels.dimensions.length} ({dimensionUnits.length})
                  </span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="any"
                    value={input.length}
                    onChange={(e) =>
                      updateNumberField(
                        'length',
                        e.target.value === '' ? '' : Number(e.target.value),
                      )
                    }
                    className={classes.fieldControl}
                  />
                </label>

                <label className={classes.field}>
                  <span>
                    {config.labels.dimensions.width} ({dimensionUnits.width})
                  </span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="any"
                    value={input.width}
                    onChange={(e) =>
                      updateNumberField(
                        'width',
                        e.target.value === '' ? '' : Number(e.target.value),
                      )
                    }
                    className={classes.fieldControl}
                  />
                </label>

                <label className={classes.field}>
                  <span>
                    {config.labels.dimensions.depth} ({dimensionUnits.depth})
                  </span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="any"
                    value={input.depth}
                    onChange={(e) =>
                      updateNumberField(
                        'depth',
                        e.target.value === '' ? '' : Number(e.target.value),
                      )
                    }
                    className={classes.fieldControl}
                  />
                </label>
              </div>
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
          outputUnitPreference={input.outputUnitPreference}
          classes={{
            resultsPanel: classes.resultsPanel,
            resultsHeader: classes.resultsHeader,
            resultsBody: classes.resultsBody,
            resultsIntro: classes.resultsIntro,
            placeholder: classes.placeholder,
            resultsGrid: classes.resultsGrid,
            resultCard: classes.resultCard,
            resultCardPrimary: classes.resultCardPrimary,
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
