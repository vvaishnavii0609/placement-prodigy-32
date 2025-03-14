
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import PerformanceTrendChart from './PerformanceTrendChart';
import SkillsBreakdownChart from './SkillsBreakdownChart';
import InterviewProgressChart from './InterviewProgressChart';

interface PerformanceTabContentProps {
  performanceData: {
    month: string;
    score: number;
    interviews: number;
  }[];
  skillsData: {
    name: string;
    value: number;
    color: string;
  }[];
}

const PerformanceTabContent: React.FC<PerformanceTabContentProps> = ({ 
  performanceData, 
  skillsData 
}) => {
  return (
    <TabsContent value="overview">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <PerformanceTrendChart performanceData={performanceData} />
        <SkillsBreakdownChart skillsData={skillsData} />
        <InterviewProgressChart performanceData={performanceData} />
      </div>
    </TabsContent>
  );
};

export default PerformanceTabContent;
