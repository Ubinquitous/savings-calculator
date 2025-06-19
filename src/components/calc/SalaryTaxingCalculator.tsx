import { useCallback, useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { useParseNumber } from '@/hooks/useParseNumber';
import {
  initialTaxedSalaryState,
  useSalaryTaxingCalculator,
} from '@/hooks/useSalaryTaxingCalculator';
import mixpanel from 'mixpanel-browser';
import { Card, CardContent, CardDescription } from '../ui/card';
import Chart from './Chart';
import { Button } from '../ui/button';

export const SalaryTaxingCalculator = () => {
  const [salary, setSalary] = useState('');
  const [nonTaxAmountPerMonth, setNonTaxAmountPerMonth] = useState('20');
  const [increasePercentage, setIncreasePercentage] = useState('');
  const [targetYear, setTargetYear] = useState('10년');
  const { format, withComma } = useParseNumber();
  const [calculatedResult, calculateSalaryAfterTax] = useSalaryTaxingCalculator();

  const handleCalculateClick = useCallback(() => {
    mixpanel.track('CLICK_SALARY_TAXING', { salary });
    if (Number.isNaN(Number(salary)) || Number.isNaN(Number(nonTaxAmountPerMonth))) {
      return alert('숫자를 정확히 입력해주세요!');
    }
    calculateSalaryAfterTax({
      salary: Number(salary) * 10000,
      nonTaxAmountPerMonth: Number(nonTaxAmountPerMonth) * 10000,
      increasePercentage: Number(increasePercentage),
      targetYear: Number(targetYear.replace('년', '')),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonTaxAmountPerMonth, salary, increasePercentage, targetYear]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (salary && nonTaxAmountPerMonth && Number(salary) >= 1000) {
        handleCalculateClick();
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [salary, nonTaxAmountPerMonth, handleCalculateClick]);

  return (
    <fieldset className="flex flex-col gap-5 w-96 p-10 rounded-[10px] border-solid border-gray-100 border-2">
      <legend className="font-medium px-2">Step 1. 세후 계산</legend>
      <Input
        label="연봉"
        guideline={`${format(Number(salary) * 10000) || '오류 '}원`}
        id="salary"
        placeholder="0"
        name="salary"
        unit="만원"
        errorText={salary && Number(salary) < 1000 ? '천만원 이상으로 입력해주세요.' : ''}
        onChange={(e) => setSalary(e.target.value)}
        value={salary}
      />
      <Input
        label="비과세액"
        guideline={`${format(Number(nonTaxAmountPerMonth) * 10000) || '오류 '}원`}
        id="nonTaxAmountPerMonth"
        placeholder="200000"
        name="nonTaxAmountPerMonth"
        unit="만원"
        onChange={(e) => setNonTaxAmountPerMonth(e.target.value)}
        value={nonTaxAmountPerMonth}
      />
      <Input
        label="매년 연봉 인상률"
        guideline={`${format(Number(increasePercentage)) || '오류 '}%`}
        id="increasePercentage"
        placeholder="10"
        name="increasePercentage"
        unit="%"
        onChange={(e) => setIncreasePercentage(e.target.value)}
        value={increasePercentage}
      />
      <article className="flex flex-col">
        {Object.entries(initialTaxedSalaryState.result).map(([title]: [string, number]) => (
          <hgroup
            key={title}
            className="flex border-solid border-[1px] border-gray-100 group"
          >
            <div className="bg-gray-100 py-2 px-3 min-w-[110px] text-xs group-last:font-bold">
              {title}
            </div>
            <div className="py-2 px-3 text-xs">
              {withComma(
                String(
                  Math.trunc(
                    calculatedResult.result[title as keyof typeof initialTaxedSalaryState.result],
                  ),
                ),
              )}
              원
            </div>
          </hgroup>
        ))}
      </article>
      <ul className="flex items-center justify-between gap-1.5">
        {['5년', '10년', '15년', '20년', '30년'].map((year) => (
          <Button
            key={year}
            onClick={() => setTargetYear(year)}
            variant={year === targetYear ? 'default' : 'outline'}
          >
            {year}
          </Button>
        ))}
      </ul>
      <section className="w-80 flex flex-col">
        <Card className="w-full">
          <CardContent>
            <CardDescription className="text-xs">매년 연봉 인상 히스토리</CardDescription>
            <div className="h-2" />
            <Chart
              chartConfig={{ label: '금액', color: 'hsl(var(--chart-1))' }}
              data={calculatedResult.history}
            />
          </CardContent>
        </Card>
      </section>
      <article className="flex flex-col py-10">
        {calculatedResult.history.map((salary) => (
          <hgroup className="flex border-solid border-[1px] border-gray-100 group">
            <div className="bg-gray-100 py-2 px-3 min-w-[110px] text-xs group-first:font-bold group-last:font-bold">
              {salary.label}
            </div>
            <div className="py-2 px-3 text-xs">{withComma(String(Math.trunc(salary.value)))}원</div>
          </hgroup>
        ))}
      </article>
    </fieldset>
  );
};
