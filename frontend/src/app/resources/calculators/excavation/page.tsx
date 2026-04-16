import { CalculatorPageShell } from '@/features/calculators/components/CalculatorPageShell';
import { getCalculatorMetadata } from '@/features/calculators/config/seo';

export const metadata = getCalculatorMetadata('excavation');

export default function ResourceExcavationCalculatorPage() {
  return <CalculatorPageShell kind="excavation" />;
}
