import { describe, expect, it } from 'vitest';
import {
  CALCULATOR_WORK_TYPE_BY_KIND,
  resolveCalculatorWorkType,
} from '../calculatorWorkType';

// Mirrors ContactForm.tsx's DEFAULT_WORK_TYPE_OPTIONS. Not imported directly:
// ContactForm.tsx is a 'use client' component tree (next/image, next/script,
// a static image import) that Vitest's JSX transform can't parse standalone,
// so this list is kept in sync manually — the important invariant (every
// mapped work type is a real, spellable dropdown option) is what's tested.
const DEFAULT_WORK_TYPE_OPTIONS = [
  'Other',
  'General Excavation / Site Work',
  'Foundation Excavation',
  'Site Grading',
  'Land Clearing',
  'Demolition',
  'Retaining Walls',
  'Utility Trenches',
  'Erosion Control',
  'Drainage',
  'Dump Truck Services',
  'Equipment Hauling',
  'Gravel Delivery',
  'Sand Delivery',
  'Topsoil Delivery',
  'Fill Dirt',
  'Driveway',
  'Parking Lot',
];

describe('resolveCalculatorWorkType', () => {
  it('maps excavation to the generic site-work option, not Foundation Excavation', () => {
    expect(resolveCalculatorWorkType('excavation')).toBe('General Excavation / Site Work');
  });

  it('maps gravel to Gravel Delivery', () => {
    expect(resolveCalculatorWorkType('gravel')).toBe('Gravel Delivery');
  });

  it('maps topsoil to Topsoil Delivery', () => {
    expect(resolveCalculatorWorkType('topsoil')).toBe('Topsoil Delivery');
  });

  it.each(['trench', 'pond', 'Excavation', 'GRAVEL', '', 'undefined', 'null'])(
    'leaves unknown or mis-cased calculator types unresolved: %s',
    (value) => {
      expect(resolveCalculatorWorkType(value)).toBeUndefined();
    },
  );

  it('every mapped work type actually exists in DEFAULT_WORK_TYPE_OPTIONS', () => {
    Object.values(CALCULATOR_WORK_TYPE_BY_KIND).forEach((workType) => {
      expect(DEFAULT_WORK_TYPE_OPTIONS).toContain(workType);
    });
  });
});
