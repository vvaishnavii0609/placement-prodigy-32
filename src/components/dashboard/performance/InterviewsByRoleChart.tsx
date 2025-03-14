
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface InterviewsByRoleChartProps {
  interviewsData: {
    name: string;
    value: number;
    color: string;
  }[];
}

const InterviewsByRoleChart: React.FC<InterviewsByRoleChartProps> = ({ interviewsData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interviews by Role</CardTitle>
        <CardDescription>Distribution of your interview practice sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={interviewsData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {interviewsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewsByRoleChart;
