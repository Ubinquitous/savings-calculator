import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '../ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

interface ChartProps {
  chartConfig: ChartConfig['value'];
  data: Array<{ label: string; value: string | number }>;
}

const Chart = ({ chartConfig, data }: ChartProps) => {
  return (
    <ChartContainer config={{ value: chartConfig }}>
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          dataKey="value"
          type="natural"
          fill="var(--color-value)"
          fillOpacity={0.4}
          stroke="var(--color-value)"
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default Chart;
