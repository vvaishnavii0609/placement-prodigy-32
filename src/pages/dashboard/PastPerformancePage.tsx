
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import PerformanceHeader from '@/components/dashboard/performance/PerformanceHeader';
import PerformanceTabContent from '@/components/dashboard/performance/PerformanceTabContent';
import InterviewsTabContent from '@/components/dashboard/performance/InterviewsTabContent';
import SkillsTabContent from '@/components/dashboard/performance/SkillsTabContent';
import CompareTabContent from '@/components/dashboard/performance/CompareTabContent';

// Data
const performanceData = [
  { month: 'Jan', score: 65, interviews: 3 },
  { month: 'Feb', score: 70, interviews: 5 },
  { month: 'Mar', score: 75, interviews: 4 },
  { month: 'Apr', score: 82, interviews: 6 },
  { month: 'May', score: 86, interviews: 8 },
  { month: 'Jun', score: 92, interviews: 7 },
];

const skillsData = [
  { name: 'Technical', value: 85, color: '#2070e0' },
  { name: 'Communication', value: 75, color: '#10c090' },
  { name: 'Problem-Solving', value: 80, color: '#9b87f5' },
  { name: 'Leadership', value: 60, color: '#f97316' },
];

const interviewsData = [
  { name: 'Software Engineer', value: 12, color: '#2070e0' },
  { name: 'Data Analyst', value: 8, color: '#10c090' },
  { name: 'Product Manager', value: 5, color: '#9b87f5' },
  { name: 'UX Designer', value: 3, color: '#f97316' },
];

const compareData = [
  { name: 'Week 1', you: 65, average: 70 },
  { name: 'Week 2', you: 68, average: 71 },
  { name: 'Week 3', you: 72, average: 72 },
  { name: 'Week 4', you: 78, average: 73 },
  { name: 'Week 5', you: 82, average: 75 },
  { name: 'Week 6', you: 85, average: 76 },
];

const PastPerformancePage: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="hidden md:flex md:w-64 md:flex-col">
        <Sidebar />
      </div>
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header userName="John Doe" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <PerformanceHeader />
          
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="interviews">Interviews</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="compare">Compare</TabsTrigger>
            </TabsList>
            
            <PerformanceTabContent 
              performanceData={performanceData} 
              skillsData={skillsData} 
            />
            
            <InterviewsTabContent interviewsData={interviewsData} />
            
            <SkillsTabContent skillsData={skillsData} />
            
            <CompareTabContent compareData={compareData} />
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default PastPerformancePage;
