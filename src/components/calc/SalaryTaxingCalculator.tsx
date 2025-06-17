import { useState } from 'react';
import { Input } from '../ui/input';
import { useParseNumber } from '@/hooks/useParseNumber';
import { Button } from '../ui/button';
import {
  initialTaxedSalaryState,
  useSalaryTaxingCalculator,
} from '@/hooks/useSalaryTaxingCalculator';
import mixpanel from 'mixpanel-browser';

export const SalaryTaxingCalculator = () => {
  const [salary, setSalary] = useState('');
  const [nonTaxAmountPerMonth, setNonTaxAmountPerMonth] = useState('200000');
  const { format, withComma } = useParseNumber();
  const [calculatedResult, calculateSalaryAfterTax] = useSalaryTaxingCalculator();

  const handleCalculateClick = () => {
    mixpanel.track('CLICK_SALARY_TAXING', { salary });
    if (Number.isNaN(Number(salary)) || Number.isNaN(Number(nonTaxAmountPerMonth))) {
      return alert('숫자를 정확히 입력해주세요!');
    }
    calculateSalaryAfterTax({
      salary: Number(salary),
      nonTaxAmountPerMonth: Number(nonTaxAmountPerMonth),
    });
  };

  return (
    <section className="flex flex-col gap-2 w-80">
      <Input
        label="연봉"
        guideline={`${format(Number(salary)) || '오류 '}원`}
        id="salary"
        placeholder="0"
        name="salary"
        onChange={(e) => setSalary(e.target.value)}
        value={salary}
      />
      <Input
        label="비과세액"
        guideline={`${format(Number(nonTaxAmountPerMonth)) || '오류 '}원`}
        id="nonTaxAmountPerMonth"
        placeholder="200000"
        name="nonTaxAmountPerMonth"
        onChange={(e) => setNonTaxAmountPerMonth(e.target.value)}
        value={nonTaxAmountPerMonth}
      />
      <Button onClick={handleCalculateClick}>세후 계산하기</Button>
      <article className="flex flex-col py-10">
        {Object.entries(initialTaxedSalaryState).map(([title]: [string, number]) => (
          <hgroup className="flex border-solid border-[1px] border-gray-100 group">
            <div className="bg-gray-100 py-2 px-3 min-w-[110px] text-xs group-last:font-bold">
              {title}
            </div>
            <div className="py-2 px-3 text-xs">
              {withComma(
                String(Math.trunc(calculatedResult[title as keyof typeof initialTaxedSalaryState])),
              )}
              원
            </div>
          </hgroup>
        ))}
      </article>
    </section>
  );
};
