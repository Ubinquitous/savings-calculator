import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useCalculator } from '@/hooks/useCalculator';
import { useParseNumber } from '@/hooks/useParseNumber';

export const Calculator = () => {
  const {
    calculatorVariable,
    calculatorVariableKey,
    handleCalculateClick,
    handleCalculatorVariableChange,
  } = useCalculator({ mode: 'calc' });
  const { format } = useParseNumber();

  return (
    <section className="flex flex-col gap-2 w-80">
      <Input
        label="초기 보유 금액"
        guideline={`${format(calculatorVariable.initialBalance)}원`}
        id={calculatorVariableKey.INITIAL_BALANCE}
        placeholder="0"
        name={calculatorVariableKey.INITIAL_BALANCE}
        onChange={handleCalculatorVariableChange}
        value={calculatorVariable.initialBalance}
      />
      <Input
        label="매월 저축할 금액"
        guideline={`${format(calculatorVariable.monthlySavings)}원`}
        id={calculatorVariableKey.MONTHLY_SAVINGS}
        placeholder="0"
        name={calculatorVariableKey.MONTHLY_SAVINGS}
        onChange={handleCalculatorVariableChange}
        value={calculatorVariable.monthlySavings}
      />

      <div className="flex items-center gap-1">
        <Input
          label="증가분"
          id={calculatorVariableKey.INCREMENT_PER_YEAR}
          placeholder="0"
          className="w-18 text-right"
          name={calculatorVariableKey.INCREMENT_PER_YEAR}
          onChange={handleCalculatorVariableChange}
          value={calculatorVariable.incrementPerYear}
        />
        <span className="text-sm mt-1 px-2 text-gray-900 shrink-0">년 마다</span>
        <Input
          id={calculatorVariableKey.INCREMENT_AMOUNT}
          placeholder="0"
          name={calculatorVariableKey.INCREMENT_AMOUNT}
          onChange={handleCalculatorVariableChange}
          value={calculatorVariable.incrementAmount}
          guideline={`${format(calculatorVariable.incrementAmount)}원 / 매월 
            ${format(
              Math.round(
                Math.trunc(calculatorVariable.incrementAmount ?? 0) /
                  (Math.trunc(calculatorVariable.incrementPerYear ?? 0) * 12),
              ),
            )}원`}
        />
      </div>
      <Input
        label="예치 기간"
        id={calculatorVariableKey.DEPOSIT_PERIOD}
        placeholder="0"
        name={calculatorVariableKey.DEPOSIT_PERIOD}
        onChange={handleCalculatorVariableChange}
        value={calculatorVariable.depositPeriod}
        guideline={`${calculatorVariable.depositPeriod}년`}
      />
      <Button onClick={handleCalculateClick}>계산하기</Button>
    </section>
  );
};
