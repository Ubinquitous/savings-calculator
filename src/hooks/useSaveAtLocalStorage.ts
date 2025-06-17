import { useAtomValue } from 'jotai';
import { calculatorResultAtom, calculatorVariableAtom } from './useCalculator';
import mixpanel from 'mixpanel-browser';

export const useSaveAtLocalStorage = () => {
  const calculatorVariable = useAtomValue(calculatorVariableAtom);
  const calculatorResult = useAtomValue(calculatorResultAtom);

  const save = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('variable', JSON.stringify(calculatorVariable));
      localStorage.setItem('result', JSON.stringify(calculatorResult));
    }
    alert('저장 완료!');
    mixpanel.track('CLICK_SAVE');
  };

  const load = () => {
    if (typeof window !== 'undefined') {
      return {
        variable: JSON.parse(localStorage.getItem('variable') ?? '{}'),
        result: JSON.parse(localStorage.getItem('result') ?? '{}'),
      };
    }
    return { variable: null, result: null };
  };

  return { save, load };
};
