
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Video, Mic, CheckCircle, Play, Pause, BarChart3, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';

const MockInterviewPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentTab, setCurrentTab] = useState('setup');
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');

  const jobRoles = [
    'Software Engineer',
    'Data Scientist',
    'Product Manager',
    'UX Designer',
    'Marketing Manager',
    'Financial Analyst'
  ];
  
  const handleStartInterview = () => {
    if (!selectedJob) return;
    setCurrentTab('interview');
    setIsRecording(true);
  };
  
  const handleEndInterview = () => {
    setIsRecording(false);
    setCurrentTab('results');
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="hidden md:flex md:w-64 md:flex-col">
        <Sidebar />
      </div>
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header userName="John Doe" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Mock Interview Simulator</h1>
            <p className="text-muted-foreground">
              Practice your interview skills with real-time feedback on your speech patterns and body posture.
            </p>
          </div>
          
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full mb-6">
              <TabsTrigger value="setup" disabled={currentTab === 'interview'}>Interview Setup</TabsTrigger>
              <TabsTrigger value="interview" disabled={!selectedJob || currentTab === 'results'}>Live Interview</TabsTrigger>
              <TabsTrigger value="results" disabled={currentTab !== 'results'}>Interview Results</TabsTrigger>
            </TabsList>
            
            <TabsContent value="setup">
              <Card>
                <CardHeader>
                  <CardTitle>Select Interview Parameters</CardTitle>
                  <CardDescription>
                    Choose the job role and difficulty for your mock interview
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Job Role</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {jobRoles.map((job) => (
                          <Button
                            key={job}
                            variant={selectedJob === job ? "default" : "outline"}
                            className="justify-start h-auto py-3 px-4"
                            onClick={() => setSelectedJob(job)}
                          >
                            {job}
                            {selectedJob === job && <CheckCircle className="ml-auto h-4 w-4" />}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Difficulty Level</h3>
                      <div className="flex gap-3">
                        {['easy', 'medium', 'hard'].map((level) => (
                          <Button
                            key={level}
                            variant={selectedDifficulty === level ? "default" : "outline"}
                            className="flex-1 capitalize"
                            onClick={() => setSelectedDifficulty(level)}
                          >
                            {level}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    size="lg" 
                    disabled={!selectedJob}
                    onClick={handleStartInterview}
                  >
                    Start Mock Interview
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="interview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <div>Live Interview: {selectedJob}</div>
                        <Badge variant="outline">{isRecording ? 'Recording' : 'Paused'}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center h-[400px] bg-muted/40 rounded-md relative">
                      {/* Webcam Preview Placeholder */}
                      <div className="bg-muted rounded-md w-full h-full flex items-center justify-center">
                        <Video className="h-20 w-20 text-muted-foreground/50" />
                      </div>
                      
                      {/* Live Feedback Overlays */}
                      {isRecording && (
                        <>
                          <div className="absolute bottom-4 left-4 bg-background/80 p-2 rounded-md">
                            <div className="flex gap-2 items-center">
                              <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
                              <span className="text-sm font-medium">REC</span>
                            </div>
                          </div>
                          
                          <div className="absolute top-4 right-4 bg-background/80 p-2 rounded-md">
                            <div className="text-sm">
                              <div className="flex justify-between items-center mb-1">
                                <span>Posture</span>
                                <span className="text-green-500">Good</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span>Speech</span>
                                <span className="text-amber-500">Improve pace</span>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm text-muted-foreground">
                        Question 3/10 • 05:32 remaining
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setIsRecording(!isRecording)}
                        >
                          {isRecording ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                          {isRecording ? 'Pause' : 'Resume'}
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={handleEndInterview}
                        >
                          <X className="h-4 w-4 mr-1" /> End Interview
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
                
                <div>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Current Question</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="font-medium">Tell me about a challenging project you worked on and how you overcame obstacles to deliver results?</p>
                        
                        <div className="text-sm text-muted-foreground">
                          <p className="mb-2">Key points to address:</p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Describe the project context</li>
                            <li>Explain specific challenges</li>
                            <li>Detail your approach</li>
                            <li>Share outcomes and learnings</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="results">
              <Card>
                <CardHeader>
                  <CardTitle>Interview Performance Analysis</CardTitle>
                  <CardDescription>
                    Comprehensive assessment of your mock interview for {selectedJob} position
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Speech Analysis</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Clarity</span>
                            <span className="text-sm text-muted-foreground">85%</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Pace</span>
                            <span className="text-sm text-muted-foreground">65%</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Filler Words</span>
                            <span className="text-sm text-muted-foreground">72%</span>
                          </div>
                          <Progress value={72} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Engagement</span>
                            <span className="text-sm text-muted-foreground">90%</span>
                          </div>
                          <Progress value={90} className="h-2" />
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-muted rounded-md">
                        <h4 className="text-sm font-medium mb-2">Areas for Improvement</h4>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500 mt-0.5">●</span>
                            <span>Try to reduce filler words like "um" and "uh" (used 24 times)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500 mt-0.5">●</span>
                            <span>Speech pace was inconsistent - too fast when explaining technical concepts</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Body Posture Analysis</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Eye Contact</span>
                            <span className="text-sm text-muted-foreground">78%</span>
                          </div>
                          <Progress value={78} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Posture</span>
                            <span className="text-sm text-muted-foreground">88%</span>
                          </div>
                          <Progress value={88} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Hand Gestures</span>
                            <span className="text-sm text-muted-foreground">70%</span>
                          </div>
                          <Progress value={70} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Facial Expressions</span>
                            <span className="text-sm text-muted-foreground">85%</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-muted rounded-md">
                        <h4 className="text-sm font-medium mb-2">Areas for Improvement</h4>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">●</span>
                            <span>Maintained good upright posture throughout the interview</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500 mt-0.5">●</span>
                            <span>Eye contact dropped during technical questions - try to maintain consistent engagement</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Content Analysis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium">Strengths</h4>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">●</span>
                            <span>Strong explanation of technical skills with concrete examples</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">●</span>
                            <span>Good use of the STAR method when describing past experiences</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">●</span>
                            <span>Demonstrated problem-solving approach effectively</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium">Areas for Improvement</h4>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500 mt-0.5">●</span>
                            <span>Answers to behavioral questions were sometimes too brief</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500 mt-0.5">●</span>
                            <span>Could provide more metrics and quantifiable results</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500 mt-0.5">●</span>
                            <span>Questions about leadership experience could be answered more thoroughly</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentTab('setup')}>
                    New Interview
                  </Button>
                  <Button>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Save to Performance History
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default MockInterviewPage;
