
import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';

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
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h1 className="text-2xl font-bold text-prepai-800">Performance Analytics</h1>
              <p className="text-muted-foreground">Track your interview preparation progress</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Select defaultValue="6months">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
          
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="interviews">Interviews</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="compare">Compare</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="col-span-full lg:col-span-2"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Trend</CardTitle>
                      <CardDescription>Your overall interview performance over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={performanceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="score" stroke="#2070e0" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills Breakdown</CardTitle>
                      <CardDescription>Your performance by skill area</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={skillsData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={90}
                              fill="#8884d8"
                              paddingAngle={5}
                              dataKey="value"
                              label={({ name, value }) => `${name}: ${value}%`}
                            >
                              {skillsData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
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
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={performanceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="interviews" fill="#10c090" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>
            
            <TabsContent value="interviews">
              <div className="grid gap-6 md:grid-cols-2">
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
                          data={[
                            { name: 'Technical', score: 85 },
                            { name: 'Behavioral', score: 90 },
                            { name: 'System Design', score: 78 },
                            { name: 'Coding', score: 82 },
                            { name: 'HR', score: 95 },
                          ]}
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
              </div>
            </TabsContent>
            
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
            
            <TabsContent value="compare">
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
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default PastPerformancePage;
