import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useCalculator } from '@/hooks/useCalculator';
import { useParseNumber } from '@/hooks/useParseNumber';
import { useSaveAtLocalStorage } from '@/hooks/useSaveAtLocalStorage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import Chart from './Chart';

export const SavingsCalculator = () => {
  return (
    <fieldset className="flex flex-col gap-2 w-96 p-10 rounded-[10px] border-solid border-gray-100 border-2">
      <legend className="font-medium px-2">Step 2. 저축 계산</legend>
      <Calculator />
      <div className="h-6" />
      <Result />
    </fieldset>
  );
};

const Calculator = () => {
  const {
    calculatorVariable,
    calculatorVariableKey,
    handleCalculateClick,
    handleCalculatorVariableChange,
  } = useCalculator({ mode: 'calc' });
  const { format } = useParseNumber();

  return (
    <section className="flex flex-col gap-2">
      <Input
        label="초기 보유 금액"
        guideline={`${format((calculatorVariable.initialBalance ?? 0) * 10000)}원`}
        id={calculatorVariableKey.INITIAL_BALANCE}
        placeholder="0"
        unit="만원"
        name={calculatorVariableKey.INITIAL_BALANCE}
        onChange={handleCalculatorVariableChange}
        value={calculatorVariable.initialBalance}
      />
      <Input
        label="매월 저축할 금액"
        guideline={`${format((calculatorVariable.monthlySavings ?? 0) * 10000)}원`}
        id={calculatorVariableKey.MONTHLY_SAVINGS}
        placeholder="0"
        unit="만원"
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
          unit="만원"
          name={calculatorVariableKey.INCREMENT_AMOUNT}
          onChange={handleCalculatorVariableChange}
          value={calculatorVariable.incrementAmount}
          guideline={`${format((calculatorVariable.incrementAmount ?? 0) * 10000)}원 / 매월 
            ${format(
              Math.round(
                Math.trunc((calculatorVariable.incrementAmount ?? 0) * 10000) /
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
        guideline={`${calculatorVariable.depositPeriod || 0}년`}
        unit="년"
      />
      <Button onClick={handleCalculateClick}>계산하기</Button>
    </section>
  );
};

const Result = () => {
  const { withComma } = useParseNumber();
  const { result } = useCalculator({ mode: 'result' });
  const { save } = useSaveAtLocalStorage();

  return (
    <section className="w-80 flex flex-col">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>계산 결과</CardTitle>
          <CardDescription>총 {withComma(String(result.totalAmount ?? 0))}원</CardDescription>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-xs">매년 저축 금액 히스토리</CardDescription>
          <div className="h-2" />
          <Chart
            chartConfig={{ label: '금액', color: 'hsl(var(--chart-1))' }}
            data={result.history}
          />
          <div className="h-6" />
          <CardDescription className="text-xs">매년 총합 저축액 히스토리</CardDescription>
          <div className="h-2" />
          <Chart
            chartConfig={{ label: '금액', color: 'hsl(var(--chart-1))' }}
            data={result.increaseHistory}
          />
        </CardContent>
      </Card>
      <div className="h-3" />
      <Button onClick={save}>결과 저장</Button>
      <div className="h-2" />
      <p className="text-xs text-gray-500">다시 웹사이트에 방문했을 때 계산한 결과를 저장해요</p>
    </section>
  );
};
