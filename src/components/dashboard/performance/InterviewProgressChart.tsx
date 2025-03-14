
import React from 'react';
import { Bar } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';
import { motion } from 'framer-motion';

interface InterviewProgressChartProps {
  performanceData: {
    month: string;
    score: number;
    interviews: number;
  }[];
}

const InterviewProgressChart: React.FC<InterviewProgressChartProps> = ({ performanceData }) => {
  const chartConfig = {
    interviews: {
      label: 'Interviews',
      color: '#10c090',
    },
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="col-span-full"
    >
      <Card>
        <CardHeader>
          <CardTitle>Interview Progress</CardTitle>
          <CardDescription>Number of interviews completed by month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <BarChart 
                data={performanceData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  cursor={{ fill: 'var(--muted)' }}
                />
                <Legend content={<ChartLegendContent />} />
                <Bar
                  dataKey="interviews"
                  fill="var(--color-interviews, #10c090)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default InterviewProgressChart;
