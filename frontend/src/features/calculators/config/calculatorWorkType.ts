import type { CalculatorKind } from '../types/calculator';

/**
 * Maps each calculator to the closest entry in ContactForm's
 * DEFAULT_WORK_TYPE_OPTIONS, so a calculator handoff can preselect a
 * sensible work type. Single source of truth for this mapping — nothing
 * else in the app should infer a work type from a pathname or slug.
 *
 * Excavation deliberately maps to the generic "General Excavation / Site
 * Work" rather than "Foundation Excavation": the excavation calculator is
 * also used for trenching, soil removal, pond excavation, and cut-and-haul
 * planning, none of which are foundation work.
 */
export const CALCULATOR_WORK_TYPE_BY_KIND: Record<CalculatorKind, string> = {
  excavation: 'General Excavation / Site Work',
  gravel: 'Gravel Delivery',
  topsoil: 'Topsoil Delivery',
};

/**
 * Resolves a raw calculator-type string (e.g. the `service` query param on
 * a calculator handoff link) to its matching work-type option. Returns
 * undefined for anything that isn't a recognized calculator kind, so
 * callers naturally leave the work-type field unselected.
 */
export function resolveCalculatorWorkType(calculatorType: string): string | undefined {
  return calculatorType in CALCULATOR_WORK_TYPE_BY_KIND
    ? CALCULATOR_WORK_TYPE_BY_KIND[calculatorType as CalculatorKind]
    : undefined;
}
