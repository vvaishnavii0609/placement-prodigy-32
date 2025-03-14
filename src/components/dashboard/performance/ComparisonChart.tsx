
import React from 'react';
import { Line } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';

interface ComparisonChartProps {
  compareData: {
    name: string;
    you: number;
    average: number;
  }[];
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ compareData }) => {
  const chartConfig = {
    you: {
      label: 'You',
      color: '#2070e0',
    },
    average: {
      label: 'Average',
      color: '#9b87f5',
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>You vs. Average PrepAI User</CardTitle>
        <CardDescription>See how your performance compares to other users</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ChartContainer config={chartConfig}>
            <LineChart data={compareData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[50, 100]} />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={{ stroke: 'var(--border)' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="you"
                stroke="var(--color-you, #2070e0)"
                strokeWidth={2}
                dot={{ strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="average"
                stroke="var(--color-average, #9b87f5)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComparisonChart;
