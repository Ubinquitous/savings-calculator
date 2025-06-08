import { atom, useAtom } from 'jotai';
import { useEffect, type ChangeEvent } from 'react';
import { useSaveAtLocalStorage } from './useSaveAtLocalStorage';

type CalculatorVariable = Partial<{
  initialBalance: number;
  monthlySavings: number;
  incrementPerYear: number;
  incrementAmount: number;
  depositPeriod: number;
}>;

interface CalculatorResult {
  history: Array<{ label: string; value: number }>;
  totalAmount: number;
}

const calculatorVariableKey = {
  INITIAL_BALANCE: 'initialBalance',
  MONTHLY_SAVINGS: 'monthlySavings',
  INCREMENT_PER_YEAR: 'incrementPerYear',
  INCREMENT_AMOUNT: 'incrementAmount',
  DEPOSIT_PERIOD: 'depositPeriod',
} as const;

const calculatorVariableInitialData: CalculatorVariable = {
  // 초기 보유 금액
  initialBalance: undefined,
  // 매월 저축할 금액
  monthlySavings: undefined,
  // 매년 증가분 증가값,
  incrementPerYear: undefined,
  // 증가분 금액
  incrementAmount: undefined,
  // 예치 기간
  depositPeriod: undefined,
};

const calculatorResultInitialData: CalculatorResult = {
  // 매년 저축 정보
  history: [],
  // 총 금액
  totalAmount: 0,
};

export const calculatorVariableAtom = atom(calculatorVariableInitialData);
export const calculatorResultAtom = atom(calculatorResultInitialData);

interface CalculatorOptions {
  mode: 'calc' | 'result';
}

export function useCalculator(options: { mode: 'calc' }): {
  calculatorVariable: CalculatorVariable;
  calculatorVariableKey: typeof calculatorVariableKey;
  handleCalculatorVariableChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCalculateClick: () => void;
};
export function useCalculator(options: { mode: 'result' }): {
  result: CalculatorResult;
};
export function useCalculator({ mode }: CalculatorOptions) {
  const { load } = useSaveAtLocalStorage();
  const [calculatorVariable, setCalculatorVariable] = useAtom(calculatorVariableAtom);
  const [calculatorResult, setCalculatorResult] = useAtom(calculatorResultAtom);

  const handleCalculatorVariableChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (Number.isNaN(Number(value))) return;

    setCalculatorVariable((variable) => ({
      ...variable,
      [name]: Number(value),
    }));
  };

  const handleCalculateClick = () => {
    const history = Array.from(Array(calculatorVariable.depositPeriod)).map((_, i) => ({
      label: `${i + 1}년`,
      value:
        calculatorVariable.monthlySavings! * 12 +
        (calculatorVariable.incrementAmount! / calculatorVariable.incrementPerYear!) * i,
    }));

    const totalAmount =
      calculatorVariable.initialBalance! +
      history.map(({ value }) => value).reduce((a, c) => a + c, 0);
    setCalculatorResult({ history, totalAmount });
  };

  useEffect(() => {
    const { variable, result } = load();
    if (variable && result) {
      setCalculatorVariable(variable);
      setCalculatorResult(result);
    }
  }, []);

  if (mode === 'calc')
    return {
      calculatorVariable,
      calculatorVariableKey,
      handleCalculatorVariableChange,
      handleCalculateClick,
    };

  if (mode === 'result') return { result: calculatorResult };
}
