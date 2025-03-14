
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import ComparisonChart from './ComparisonChart';

interface CompareTabContentProps {
  compareData: {
    name: string;
    you: number;
    average: number;
  }[];
}

const CompareTabContent: React.FC<CompareTabContentProps> = ({ compareData }) => {
  return (
    <TabsContent value="compare">
      <ComparisonChart compareData={compareData} />
    </TabsContent>
  );
};

export default CompareTabContent;
