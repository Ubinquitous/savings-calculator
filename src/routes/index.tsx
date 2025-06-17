import { Calculator } from '@/components/calc/Calculator';
import { Result } from '@/components/calc/Result';
import { SalaryTaxingCalculator } from '@/components/calc/SalaryTaxingCalculator';
import { Label } from '@/components/ui/label';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-screen flex items-center justify-center flex-col">
      <header className="flex items-center pb-4">
        <img
          src="/icon.png"
          alt="저축하장"
          className="w-10 h-10"
        />
        <Label className="text-xl">토파즈 저축 계산기</Label>
      </header>
      <SalaryTaxingCalculator />
      <Calculator />
      <div className="h-6" />
      <Result />
    </div>
  );
}
