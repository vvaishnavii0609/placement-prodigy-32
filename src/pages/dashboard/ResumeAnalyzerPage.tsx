
import React, { useState } from 'react';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import ResumeAnalyzer from '@/components/dashboard/ResumeAnalyzer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const ResumeAnalyzerPage: React.FC = () => {
  const [jobRole, setJobRole] = useState<string>('');
  const [customRole, setCustomRole] = useState<string>('');
  
  // Common job roles for dropdown
  const commonRoles = [
    'Software Engineer',
    'Data Scientist',
    'Product Manager',
    'UX Designer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'DevOps Engineer',
    'Machine Learning Engineer',
    'Business Analyst'
  ];

  const handleRoleChange = (value: string) => {
    setJobRole(value);
    if (value !== 'custom') {
      setCustomRole('');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header userName="John Doe" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <h1 className="text-2xl font-bold text-prepai-800">Resume Analyzer</h1>
            <p className="text-muted-foreground">Get AI-powered feedback and suggestions for your resume</p>
          </motion.div>
          
          <div className="grid gap-6 md:grid-cols-7">
            {/* Resume Analyzer Component - 4 cols */}
            <div className="md:col-span-4">
              <ResumeAnalyzer />
            </div>
            
            {/* Job Role Selection - 3 cols */}
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-prepai-600" />
                    Target Job Role
                  </CardTitle>
                  <CardDescription>
                    Select the job role you're applying for to get tailored feedback
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Job Role</Label>
                    <Select value={jobRole} onValueChange={handleRoleChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a job role" />
                      </SelectTrigger>
                      <SelectContent>
                        {commonRoles.map((role) => (
                          <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                        <SelectItem value="custom">Custom Role</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {jobRole === 'custom' && (
                    <div className="space-y-2">
                      <Label htmlFor="customRole">Custom Job Role</Label>
                      <Input 
                        id="customRole" 
                        value={customRole} 
                        onChange={(e) => setCustomRole(e.target.value)} 
                        placeholder="e.g. AI Research Scientist"
                      />
                    </div>
                  )}
                  
                  {jobRole && (
                    <div className="p-4 bg-prepai-50 text-prepai-700 rounded-lg">
                      <p className="font-medium">Resume Analysis Tips:</p>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• Highlight skills relevant to {jobRole === 'custom' ? customRole : jobRole}</li>
                        <li>• Use industry-specific keywords and terminology</li>
                        <li>• Quantify your achievements with specific metrics</li>
                        <li>• Focus on recent and relevant experience</li>
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResumeAnalyzerPage;
