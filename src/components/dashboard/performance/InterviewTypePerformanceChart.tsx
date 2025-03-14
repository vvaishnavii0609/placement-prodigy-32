
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const interviewTypeData = [
  { name: 'Technical', score: 85 },
  { name: 'Behavioral', score: 90 },
  { name: 'System Design', score: 78 },
  { name: 'Coding', score: 82 },
  { name: 'HR', score: 95 },
];

const InterviewTypePerformanceChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview Performance by Type</CardTitle>
        <CardDescription>How you perform in different interview types</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={interviewTypeData}
              margin={{ top: 20, right: 20, bottom: 20, left: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="score" fill="#9b87f5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewTypePerformanceChart;
