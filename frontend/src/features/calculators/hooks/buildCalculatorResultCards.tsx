'use client';

import { createElement, Fragment } from 'react';
import {
  m3ToCubicYards,
  tonnesToShortTons,
} from '../logic/conversions';
import { formatNumber, formatTruckLoads } from '../utils/format';
import type {
  CalculatorController,
  CalculatorResultCardModel,
} from './calculatorController.types';
import type {
  CalculatorFormInput,
  CalculatorVolumeValueSource,
} from '../types/calculator';

type ResultCardId =
  | 'volume'
  | 'adjustedVolume'
  | 'weight'
  | 'truckLoads'
  | 'secondaryVolume';

function formatCubicUnit(value: string, unitLabel: 'm' | 'yd') {
  return createElement(
    Fragment,
    null,
    value,
    ' ',
    unitLabel,
    createElement('sup', null, '3'),
  );
}

function formatVolume(
  cubicMetres: number,
  outputUnitPreference: CalculatorFormInput['outputUnitPreference'],
) {
  if (outputUnitPreference === 'imperial') {
    return formatCubicUnit(formatNumber(m3ToCubicYards(cubicMetres)), 'yd');
  }

  return formatCubicUnit(formatNumber(cubicMetres), 'm');
}

function formatWeight(
  metricTonnes: number,
  outputUnitPreference: CalculatorFormInput['outputUnitPreference'],
) {
  if (outputUnitPreference === 'imperial') {
    return `${formatNumber(tonnesToShortTons(metricTonnes), 1)} short tons`;
  }

  return `${formatNumber(metricTonnes, 1)} metric tonnes`;
}

function getResultVolumeValue(
  result: NonNullable<CalculatorController['state']['result']>,
  source: CalculatorVolumeValueSource,
) {
  return result[source];
}

export function buildCalculatorResultCardMap(
  config: CalculatorController['config'],
  result: NonNullable<CalculatorController['state']['result']>,
  outputUnitPreference: CalculatorFormInput['outputUnitPreference'],
  showDetailedResults: boolean,
): Partial<Record<ResultCardId, CalculatorResultCardModel>> {
  return {
    volume: {
      id: 'volume',
      label: config.resultPresentation.volumeLabel,
      value: formatVolume(
        getResultVolumeValue(result, config.resultPresentation.volumeValueSource),
        outputUnitPreference,
      ),
      meta: showDetailedResults && config.resultPresentation.showCardMeta
        ? 'Adjusted total material volume.'
        : undefined,
      tone: 'primary',
    },
    adjustedVolume: config.resultPresentation.adjustedVolumeLabel
      ? {
          id: 'adjustedVolume',
          label: config.resultPresentation.adjustedVolumeLabel,
          value: formatVolume(
            getResultVolumeValue(
              result,
              config.resultPresentation.adjustedVolumeValueSource ??
                'adjustedLooseMaterialVolumeM3',
            ),
            outputUnitPreference,
          ),
          meta: showDetailedResults && config.resultPresentation.showCardMeta
            ? 'Expanded volume to haul away.'
            : undefined,
          tone: 'primary',
        }
      : undefined,
    weight: {
      id: 'weight',
      label: config.resultPresentation.weightLabel,
      value: formatWeight(result.adjustedWeightTons, outputUnitPreference),
      meta: showDetailedResults && config.resultPresentation.showCardMeta
        ? 'Based on material density and moisture.'
        : undefined,
      tone: 'muted',
    },
    truckLoads: {
      id: 'truckLoads',
      label: config.resultPresentation.truckLoadsLabel,
      value: formatTruckLoads(result.estimatedTruckLoads),
      meta: showDetailedResults && config.resultPresentation.showCardMeta
        ? 'Rounded for quick hauling estimates.'
        : undefined,
      tone: 'primary',
    },
    secondaryVolume: config.resultPresentation.secondaryVolumeLabel
      ? {
          id: 'secondaryVolume',
          label: config.resultPresentation.secondaryVolumeLabel,
          value: formatVolume(
            getResultVolumeValue(
              result,
              config.resultPresentation.secondaryVolumeValueSource ??
                'rawProjectVolumeM3',
            ),
            outputUnitPreference,
          ),
          meta: showDetailedResults && config.resultPresentation.showCardMeta
            ? 'Before advanced adjustments.'
            : undefined,
          tone: 'muted',
        }
      : undefined,
  };
}
