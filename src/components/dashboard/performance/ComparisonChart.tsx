
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ComparisonChartProps {
  compareData: {
    name: string;
    you: number;
    average: number;
  }[];
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ compareData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>You vs. Average PrepAI User</CardTitle>
        <CardDescription>See how your performance compares to other users</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={compareData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[50, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="you" stroke="#2070e0" strokeWidth={2} />
              <Line type="monotone" dataKey="average" stroke="#9b87f5" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComparisonChart;
