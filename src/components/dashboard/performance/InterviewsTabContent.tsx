
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import InterviewsByRoleChart from './InterviewsByRoleChart';
import InterviewTypePerformanceChart from './InterviewTypePerformanceChart';

interface InterviewsTabContentProps {
  interviewsData: {
    name: string;
    value: number;
    color: string;
  }[];
}

const InterviewsTabContent: React.FC<InterviewsTabContentProps> = ({ interviewsData }) => {
  return (
    <TabsContent value="interviews">
      <div className="grid gap-6 md:grid-cols-2">
        <InterviewsByRoleChart interviewsData={interviewsData} />
        <InterviewTypePerformanceChart />
      </div>
    </TabsContent>
  );
};

export default InterviewsTabContent;
