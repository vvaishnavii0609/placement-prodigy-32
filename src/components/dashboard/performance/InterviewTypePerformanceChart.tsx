
import React from 'react';
import { Bar } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const interviewTypeData = [
  { name: 'Technical', score: 85 },
  { name: 'Behavioral', score: 90 },
  { name: 'System Design', score: 78 },
  { name: 'Coding', score: 82 },
  { name: 'HR', score: 95 },
];

const InterviewTypePerformanceChart: React.FC = () => {
  const chartConfig = {
    score: {
      label: 'Score',
      color: '#9b87f5',
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview Performance by Type</CardTitle>
        <CardDescription>How you perform in different interview types</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ChartContainer config={chartConfig}>
            <BarChart
              layout="vertical"
              data={interviewTypeData}
              margin={{ top: 20, right: 20, bottom: 20, left: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={{ fill: 'var(--muted)' }}
              />
              <Bar
                dataKey="score"
                fill="var(--color-score, #9b87f5)"
                radius={[4, 4, 4, 4]}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewTypePerformanceChart;
