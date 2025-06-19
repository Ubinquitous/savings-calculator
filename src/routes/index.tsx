import { SalaryTaxingCalculator } from '@/components/calc/SalaryTaxingCalculator';
import { SavingsCalculator } from '@/components/calc/SavingsCalculator';
import { Label } from '@/components/ui/label';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-screen flex items-center justify-center flex-col gap-10">
      <header className="flex items-center pb-4">
        <img
          src="/icon.png"
          alt="저축하장"
          className="w-10 h-10"
        />
        <Label className="text-xl">토파즈 저축 계산기</Label>
      </header>
      <SalaryTaxingCalculator />
      <SavingsCalculator />
    </div>
  );
}
