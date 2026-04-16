import { CalculatorPageShell } from '@/features/calculators/components/CalculatorPageShell';
import { getCalculatorMetadata } from '@/features/calculators/config/seo';

export const metadata = getCalculatorMetadata('topsoil');

export default function ResourceTopsoilCalculatorPage() {
  return <CalculatorPageShell kind="topsoil" />;
}
