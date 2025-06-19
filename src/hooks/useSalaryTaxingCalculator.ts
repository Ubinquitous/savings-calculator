import 근로소득간이세액표 from '@/assets/근로소득_간이세액표.json';
import { useState } from 'react';

const YEAR = 12;
const perMonth = (amount: number) => Math.round(amount / YEAR);
const percentaging = (amount: number) => amount / 100;

export const initialTaxedSalaryState = {
  result: {
    국민연금: 0,
    건강보험: 0,
    장기요양: 0,
    고용보험: 0,
    소득세: 0,
    지방소득세: 0,
    '월 예상 실수령액': 0,
  },
  history: [],
};

interface UseSalaryTaxingCalculatorOptions {
  salary: number;
  nonTaxAmountPerMonth?: number;
  increasePercentage: number;
  targetYear: number;
}

interface TaxedSalary {
  국민연금: number;
  건강보험: number;
  장기요양: number;
  고용보험: number;
  소득세: number;
  지방소득세: number;
  '월 예상 실수령액': number;
}

interface TaxedCalculatorResponse {
  result: TaxedSalary;
  history: Array<{ label: string; value: number }>;
}

type SalaryTaxingCalculatorFunction = ({
  salary,
  nonTaxAmountPerMonth,
  increasePercentage,
  targetYear,
}: UseSalaryTaxingCalculatorOptions) => void;

export const useSalaryTaxingCalculator = (): [
  TaxedCalculatorResponse,
  SalaryTaxingCalculatorFunction,
] => {
  const [result, setResult] = useState<TaxedCalculatorResponse>(initialTaxedSalaryState);

  const calculate: SalaryTaxingCalculatorFunction = ({
    salary,
    nonTaxAmountPerMonth = 200_000,
    increasePercentage = 0,
    targetYear = 10,
  }) => {
    const taxTargetSalary = salary - nonTaxAmountPerMonth * YEAR;

    const 국민연금 = perMonth(percentaging(taxTargetSalary * 4.5));
    const 건강보험 = perMonth(percentaging(taxTargetSalary * 3.545));
    const 장기요양 = percentaging(건강보험 * 12.95);
    const 고용보험 = perMonth(percentaging(taxTargetSalary * 0.9));
    const 소득세 = get소득세(taxTargetSalary);
    const 지방소득세 = percentaging(소득세 * 10);
    const totalTax = 국민연금 + 건강보험 + 장기요양 + 고용보험 + 소득세 + 지방소득세;
    const totalAmount = Math.round(perMonth(salary) - totalTax);

    const history = Array.from(Array(targetYear)).map((_, i) => ({
      label: `${i + 1}년`,
      value: salary * (1 + increasePercentage / 100) ** i,
    }));
    setResult({
      result: {
        국민연금,
        건강보험,
        장기요양,
        고용보험,
        소득세,
        지방소득세,
        '월 예상 실수령액': totalAmount,
      },
      history,
    });
  };

  return [result, calculate];
};

const get소득세 = (salary: number) => {
  const tableSalary = findClosestSalary(salary / YEAR, 근로소득간이세액표);
  return 근로소득간이세액표[tableSalary]?.after || 0;
};

function findClosestSalary(
  targetValue: number,
  data: Array<{ after: number; monthSalary: number }>,
) {
  if (!data || data.length === 0) return 0;

  let closestIndex = 0;
  let minDifference = Infinity;

  for (let i = 0; i < data.length; i++) {
    const difference = Math.abs(data[i].monthSalary - targetValue);

    if (difference < minDifference) {
      minDifference = difference;
      closestIndex = i;
    }
  }

  return Math.max(0, Math.min(closestIndex, data.length - 1));
}
