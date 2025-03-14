
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SkillsTabContentProps {
  skillsData: {
    name: string;
    value: number;
    color: string;
  }[];
}

const SkillsTabContent: React.FC<SkillsTabContentProps> = ({ skillsData }) => {
  return (
    <TabsContent value="skills">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillsData.map((skill, index) => (
          <Card key={skill.name}>
            <CardHeader>
              <CardTitle>{skill.name}</CardTitle>
              <CardDescription>Your proficiency level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div 
                  className="w-32 h-32 rounded-full flex items-center justify-center text-2xl font-bold relative mb-4"
                  style={{ 
                    background: `conic-gradient(${skill.color} ${skill.value}%, #f3f4f6 ${skill.value}%)`,
                    boxShadow: `0 0 15px ${skill.color}40`
                  }}
                >
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                    {skill.value}%
                  </div>
                </div>
                
                <div className="space-y-2 w-full">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Strengths</span>
                      <span>Areas to Improve</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div 
                        className="h-full rounded-full" 
                        style={{ width: `${skill.value}%`, backgroundColor: skill.color }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </TabsContent>
  );
};

export default SkillsTabContent;
