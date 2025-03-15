
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Play, Pause, BarChart3 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import DailySpeechTasks from '@/components/dashboard/communication/DailySpeechTasks';

const SpeechDetectionPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState('analysis');
  
  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };
  
  return (
    <div className="container-tight max-w-5xl py-10">
      <h1 className="text-3xl font-bold mb-2">Speech Analysis</h1>
      <p className="text-muted-foreground mb-6">
        Analyze your speech patterns and practice with guided exercises to improve your communication skills
      </p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full mb-6">
          <TabsTrigger value="analysis">Speech Analyzer</TabsTrigger>
          <TabsTrigger value="exercises">Daily Exercises</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analysis">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Live Speech Analysis</CardTitle>
                  <CardDescription>
                    Record yourself speaking to receive real-time feedback
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="relative min-h-[200px] bg-muted rounded-lg flex items-center justify-center">
                    {isRecording ? (
                      <>
                        <div className="flex flex-col items-center text-muted-foreground">
                          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                              <Mic className="h-10 w-10 text-primary" />
                            </div>
                          </div>
                          <p>Recording in progress...</p>
                          <p className="text-sm mt-1">Speak naturally at a normal pace</p>
                        </div>
                        <div className="absolute bottom-4 left-4 flex space-x-2">
                          {[40, 60, 80, 30, 50, 70, 90, 40, 60, 30].map((value, index) => (
                            <div 
                              key={index}
                              className="w-1 bg-primary/60 rounded-full"
                              style={{ 
                                height: `${value}px`,
                                animation: `equalizer 0.${5 + index}s ease-in-out infinite alternate`
                              }}
                            ></div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-8 text-muted-foreground">
                        <MicOff className="h-16 w-16 mx-auto mb-4 opacity-40" />
                        <p className="text-lg">Click the button below to start recording</p>
                        <p className="text-sm mt-1">Your audio will be analyzed in real-time</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-center">
                    <Button 
                      size="lg"
                      onClick={toggleRecording}
                      className="gap-2"
                    >
                      {isRecording ? (
                        <>
                          <Pause className="h-5 w-5" /> Stop Recording
                        </>
                      ) : (
                        <>
                          <Mic className="h-5 w-5" /> Start Recording
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Analysis Results</CardTitle>
                  <CardDescription>
                    {isRecording ? 'Real-time feedback on your speech' : 'Start recording to see results'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {isRecording ? (
                    <>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Speech Clarity</span>
                          <span className="text-sm text-muted-foreground">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Speaking Pace</span>
                          <span className="text-sm text-muted-foreground">92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Filler Words</span>
                          <span className="text-sm text-muted-foreground">65%</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Voice Modulation</span>
                          <span className="text-sm text-muted-foreground">82%</span>
                        </div>
                        <Progress value={82} className="h-2" />
                      </div>
                      
                      <div className="mt-4 p-3 bg-muted/50 rounded-md text-sm">
                        <h4 className="font-medium mb-2">Feedback:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">●</span>
                            <span>Great pace and clarity in your speech</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500 mt-0.5">●</span>
                            <span>Reduce usage of "um" and "like" (detected 5 times)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">●</span>
                            <span>Good voice modulation with appropriate emphasis</span>
                          </li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[200px] text-center text-muted-foreground">
                      <BarChart3 className="h-12 w-12 mb-3 opacity-40" />
                      <p>No data available yet</p>
                      <p className="text-sm mt-1">Start recording to analyze your speech</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    disabled={!isRecording}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Play Recording
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="exercises">
          <DailySpeechTasks />
        </TabsContent>
      </Tabs>
      
      <style jsx global>{`
        @keyframes equalizer {
          0% {
            height: 5px;
          }
          100% {
            height: var(--value);
          }
        }
      `}</style>
    </div>
  );
};

export default SpeechDetectionPage;
