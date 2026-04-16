import { CalculatorPageShell } from '@/features/calculators/components/CalculatorPageShell';
import { getCalculatorMetadata } from '@/features/calculators/config/seo';

export const metadata = getCalculatorMetadata('topsoil');

export default function TopsoilCalculatorPage() {
  return <CalculatorPageShell kind="topsoil" />;
}
