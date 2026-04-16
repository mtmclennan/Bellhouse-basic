import { CalculatorPageShell } from '@/features/calculators/components/CalculatorPageShell';
import { getCalculatorMetadata } from '@/features/calculators/config/seo';

export const metadata = getCalculatorMetadata('gravel');

export default function ResourceGravelCalculatorPage() {
  return <CalculatorPageShell kind="gravel" />;
}
