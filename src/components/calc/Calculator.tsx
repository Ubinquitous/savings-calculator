import { Input } from '../ui/input';
import { Label } from '../ui/label';
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
    <section className="flex flex-col gap-2 w-96">
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor={calculatorVariableKey.INITIAL_BALANCE}>초기 보유 금액</Label>
        <figure className="flex flex-col gap-1">
          <Input
            id={calculatorVariableKey.INITIAL_BALANCE}
            placeholder="0"
            name={calculatorVariableKey.INITIAL_BALANCE}
            onChange={handleCalculatorVariableChange}
            value={calculatorVariable.initialBalance}
          />
          <span className="text-xs ml-auto text-gray-500">
            {format(calculatorVariable.initialBalance)}원
          </span>
        </figure>
      </div>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor={calculatorVariableKey.MONTHLY_SAVINGS}>매월 저축할 금액</Label>
        <figure className="flex flex-col gap-1">
          <Input
            id={calculatorVariableKey.MONTHLY_SAVINGS}
            placeholder="0"
            name={calculatorVariableKey.MONTHLY_SAVINGS}
            onChange={handleCalculatorVariableChange}
            value={calculatorVariable.monthlySavings}
          />
          <span className="text-xs ml-auto text-gray-500">
            {format(calculatorVariable.monthlySavings)}원
          </span>
        </figure>
      </div>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label>증가분</Label>
        <figure className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Input
              id={calculatorVariableKey.INCREMENT_PER_YEAR}
              placeholder="0"
              className="w-10 text-right"
              name={calculatorVariableKey.INCREMENT_PER_YEAR}
              onChange={handleCalculatorVariableChange}
              value={calculatorVariable.incrementPerYear}
            />
            <span className="text-sm text-gray-900 shrink-0 mr-4">년 마다</span>
            <Input
              id={calculatorVariableKey.INCREMENT_AMOUNT}
              placeholder="0"
              name={calculatorVariableKey.INCREMENT_AMOUNT}
              onChange={handleCalculatorVariableChange}
              value={calculatorVariable.incrementAmount}
            />
          </div>
          <span className="text-xs ml-auto text-gray-500">
            {format(calculatorVariable.incrementAmount)}원 / 매월{' '}
            {format(
              Math.round(
                Math.trunc(calculatorVariable.incrementAmount ?? 0) /
                  (Math.trunc(calculatorVariable.incrementPerYear ?? 0) * 12),
              ),
            )}
            원
          </span>
        </figure>
      </div>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label>예치 기간</Label>
        <figure className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Input
              id={calculatorVariableKey.DEPOSIT_PERIOD}
              placeholder="0"
              name={calculatorVariableKey.DEPOSIT_PERIOD}
              onChange={handleCalculatorVariableChange}
              value={calculatorVariable.depositPeriod}
            />
            <span className="text-sm text-gray-900 shrink-0 mr-4">년</span>
          </div>
        </figure>
      </div>
      <Button onClick={handleCalculateClick}>계산하기</Button>
    </section>
  );
};
