import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCalculator } from '@/hooks/useCalculator';
import { useParseNumber } from '@/hooks/useParseNumber';
import { Button } from '../ui/button';
import { useSaveAtLocalStorage } from '@/hooks/useSaveAtLocalStorage';
import Chart from './Chart';

export const Result = () => {
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
