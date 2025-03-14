
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  PlayCircle, 
  PauseCircle, 
  Mic, 
  RefreshCw, 
  AlertTriangle, 
  Volume2, 
  Download,
  BarChart4
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';

const SpeechDetectionPage: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [activeTab, setActiveTab] = useState('recording');
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const { toast } = useToast();
  
  const startRecording = async () => {
    try {
      setAudioBlob(null);
      setAudioUrl(null);
      setAnalysisComplete(false);
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const audioChunks: BlobPart[] = [];
      
      mediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });
      
      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioUrl(audioUrl);
        
        // Simulate analysis completion
        setTimeout(() => {
          setAnalysisComplete(true);
          setActiveTab('results');
          toast({
            title: "Analysis complete",
            description: "Your speech analysis is ready to view.",
            variant: "default",
          });
        }, 2000);
      });
      
      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: "Recording started",
        description: "We're now recording your speech for analysis.",
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Microphone access error",
        description: "Please allow microphone access to use the speech detection feature.",
        variant: "destructive",
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop all audio tracks
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
      
      toast({
        title: "Recording stopped",
        description: "Analyzing your speech pattern...",
      });
    }
  };
  
  const downloadRecording = () => {
    if (audioBlob) {
      const a = document.createElement('a');
      a.href = audioUrl as string;
      a.download = 'speech-recording.wav';
      a.click();
    }
  };
  
  const speechTips = [
    {
      title: "Pace yourself",
      description: "Speak at a moderate pace to ensure clarity and understanding."
    },
    {
      title: "Eliminate fillers",
      description: "Reduce filler words like 'um', 'uh', and 'like' in your speech."
    },
    {
      title: "Vary your tone",
      description: "Use tonal variety to emphasize important points and maintain engagement."
    },
    {
      title: "Pause effectively",
      description: "Strategic pauses can enhance impact and give you time to collect thoughts."
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="hidden md:flex md:w-64 md:flex-col">
        <Sidebar />
      </div>
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header userName="John Doe" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mb-6"
          >
            <h1 className="text-2xl font-bold text-prepai-800">Speech Detection</h1>
            <p className="text-muted-foreground">
              Analyze and improve your speech patterns for better interview communication
            </p>
          </motion.div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 grid w-full grid-cols-2 md:w-auto">
              <TabsTrigger value="recording">Recording</TabsTrigger>
              <TabsTrigger value="results" disabled={!analysisComplete}>Analysis Results</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recording">
              <div className="grid gap-6 md:grid-cols-3">
                <motion.div 
                  variants={itemVariants} 
                  className="md:col-span-2"
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Voice Recorder</CardTitle>
                        <Badge variant={isRecording ? "default" : audioBlob ? "secondary" : "outline"}>
                          {isRecording ? "Recording" : audioBlob ? "Recorded" : "Ready"}
                        </Badge>
                      </div>
                      <CardDescription>
                        Record your voice to analyze speech patterns
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="relative bg-muted rounded-lg overflow-hidden p-8 mb-4 min-h-[200px] flex flex-col items-center justify-center">
                        {isRecording ? (
                          <motion.div 
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center"
                          >
                            <Mic className="h-10 w-10 text-white" />
                          </motion.div>
                        ) : audioUrl ? (
                          <div className="w-full max-w-md">
                            <audio 
                              ref={audioRef}
                              src={audioUrl} 
                              controls 
                              className="w-full" 
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <Volume2 className="h-16 w-16 text-muted-foreground mb-4" />
                            <p className="text-muted-foreground">Ready to record your speech</p>
                          </div>
                        )}
                        
                        {isRecording && (
                          <div className="mt-6 flex items-center gap-2">
                            <span className="animate-pulse bg-red-500 h-3 w-3 rounded-full"></span>
                            <span className="text-sm font-medium">Recording in progress...</span>
                          </div>
                        )}
                        
                        {!isRecording && audioBlob && !analysisComplete && (
                          <div className="mt-6 flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1 }}
                            >
                              <RefreshCw className="h-4 w-4 text-prepai-500" />
                            </motion.div>
                            <span className="text-sm font-medium">Analyzing speech patterns...</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-3 mt-4">
                        {!isRecording ? (
                          <Button 
                            size="lg" 
                            onClick={startRecording}
                            className="bg-prepai-500 hover:bg-prepai-600"
                            disabled={analysisComplete}
                          >
                            <PlayCircle className="mr-2 h-5 w-5" />
                            Start Recording
                          </Button>
                        ) : (
                          <Button 
                            size="lg" 
                            onClick={stopRecording}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            <PauseCircle className="mr-2 h-5 w-5" />
                            Stop Recording
                          </Button>
                        )}
                        
                        {audioBlob && (
                          <Button variant="outline" size="lg" onClick={downloadRecording}>
                            <Download className="mr-2 h-5 w-5" />
                            Download
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Recording Tips</CardTitle>
                      <CardDescription>Get the best results for your speech analysis</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex flex-col space-y-6">
                        <div className="flex items-start gap-3">
                          <div className="bg-prepai-100 text-prepai-700 p-2 rounded-full">
                            <Mic className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium">Speak clearly</h3>
                            <p className="text-xs text-muted-foreground">Maintain a clear voice at a conversational volume</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="bg-prepai-100 text-prepai-700 p-2 rounded-full">
                            <AlertTriangle className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium">Minimize background noise</h3>
                            <p className="text-xs text-muted-foreground">Record in a quiet environment for best results</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="bg-prepai-100 text-prepai-700 p-2 rounded-full">
                            <Volume2 className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium">Practice natural speech</h3>
                            <p className="text-xs text-muted-foreground">Speak as you would in an actual interview</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="bg-prepai-100 text-prepai-700 p-2 rounded-full">
                            <BarChart4 className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium">Record for at least 30 seconds</h3>
                            <p className="text-xs text-muted-foreground">Longer recordings provide better analysis</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>
            
            <TabsContent value="results">
              <div className="grid gap-6 md:grid-cols-2">
                <motion.div 
                  variants={itemVariants}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Speech Analysis Results</CardTitle>
                      <CardDescription>Detailed breakdown of your speaking patterns</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Clarity</span>
                          <span>Good (82%)</span>
                        </div>
                        <Progress value={82} className="h-2" />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Pace</span>
                          <span>Slightly Fast (68%)</span>
                        </div>
                        <Progress value={68} className="h-2" />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Filler Words</span>
                          <span>Moderate (58%)</span>
                        </div>
                        <Progress value={58} className="h-2" />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Tone Variation</span>
                          <span>Excellent (90%)</span>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Volume</span>
                          <span>Good (78%)</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      
                      <div className="mt-6 pt-4 border-t">
                        <p className="font-medium mb-2">Word Frequency:</p>
                        <div className="grid grid-cols-3 gap-2">
                          {["um", "like", "you know", "so", "actually", "basically"].map((word, i) => (
                            <Badge key={i} variant="outline" className="justify-center">{word}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Improvement Suggestions</CardTitle>
                      <CardDescription>Personalized recommendations to enhance your speech</CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <h3 className="font-medium text-yellow-800 mb-1">Reduce speaking pace</h3>
                          <p className="text-sm text-yellow-700">
                            Try slowing down your speech by about 15% to improve clarity and give your audience time to process your points.
                          </p>
                        </div>
                        
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <h3 className="font-medium text-blue-800 mb-1">Minimize filler words</h3>
                          <p className="text-sm text-blue-700">
                            Practice reducing the use of "um" and "like". Replace these with strategic pauses instead.
                          </p>
                        </div>
                        
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <h3 className="font-medium text-green-800 mb-1">Continue with excellent tone variation</h3>
                          <p className="text-sm text-green-700">
                            Your voice modulation is engaging. Keep using tonal variety to emphasize key points.
                          </p>
                        </div>
                        
                        <Button className="w-full mt-4 bg-prepai-500 hover:bg-prepai-600">
                          Generate Detailed Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="md:col-span-2"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Speech Improvement Tips</CardTitle>
                      <CardDescription>Key techniques for effective communication</CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {speechTips.map((tip, index) => (
                          <motion.div 
                            key={index}
                            whileHover={{ y: -5 }}
                            className="bg-accent rounded-lg p-4"
                          >
                            <h3 className="font-medium mb-2">{tip.title}</h3>
                            <p className="text-sm text-muted-foreground">{tip.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default SpeechDetectionPage;
