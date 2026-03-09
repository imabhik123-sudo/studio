'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { burndownData } from '@/lib/data';
import { cn } from '@/lib/utils';
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const chartConfig = {
  actual: {
    label: 'Actual',
    color: 'hsl(var(--chart-1))',
  },
  ideal: {
    label: 'Ideal',
    color: 'hsl(var(--chart-2))',
  },
};

export function BurndownChartCard({ className }: { className?: string }) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Sprint Burndown</CardTitle>
        <CardDescription>
          Tracking progress against the ideal trajectory.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart data={burndownData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              label={{
                value: 'Tasks Remaining',
                angle: -90,
                position: 'insideLeft',
                offset: -5,
                style: { textAnchor: 'middle', fill: 'hsl(var(--muted-foreground))' },
              }}
            />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="ideal"
              type="monotone"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={2}
              strokeDasharray="3 3"
              dot={false}
            />
            <Line
              dataKey="actual"
              type="monotone"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
