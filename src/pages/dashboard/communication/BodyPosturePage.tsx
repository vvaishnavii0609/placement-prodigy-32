
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, PauseCircle, Camera, RefreshCw, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';

const BodyPosturePage: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsReady(true);
        toast({
          title: "Camera started",
          description: "We're now analyzing your body posture.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera access error",
        description: "Please allow camera access to use the body posture detection feature.",
        variant: "destructive",
      });
    }
  };
  
  const toggleDetection = () => {
    if (!isReady) {
      startCamera();
    }
    setIsActive(!isActive);
  };
  
  const postureTips = [
    {
      title: "Maintain a straight back",
      description: "Keep your back straight and shoulders relaxed to project confidence."
    },
    {
      title: "Make eye contact",
      description: "Maintain natural eye contact with the interviewer to show engagement."
    },
    {
      title: "Mind your hand gestures",
      description: "Use moderate hand gestures to emphasize points, but avoid excessive movement."
    },
    {
      title: "Avoid fidgeting",
      description: "Be conscious of nervous habits like tapping feet or playing with objects."
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
            <h1 className="text-2xl font-bold text-prepai-800">Body Posture Detection</h1>
            <p className="text-muted-foreground">
              Analyze and improve your body language for better interview performance
            </p>
          </motion.div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div 
              variants={itemVariants} 
              className="md:col-span-2"
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Camera Feed</CardTitle>
                    <Badge variant={isActive ? "default" : "outline"}>
                      {isActive ? "Analyzing" : "Not Active"}
                    </Badge>
                  </div>
                  <CardDescription>
                    Position yourself in frame to analyze your posture
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="relative bg-muted rounded-lg overflow-hidden aspect-video mb-4">
                    {!isReady ? (
                      <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                        <Camera className="h-16 w-16 text-muted-foreground" />
                        <p className="text-muted-foreground">Camera access required</p>
                        <Button onClick={startCamera}>
                          <Camera className="mr-2 h-4 w-4" />
                          Start Camera
                        </Button>
                      </div>
                    ) : (
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        muted 
                        className="w-full h-full object-cover"
                      />
                    )}
                    
                    {isActive && isReady && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute top-4 left-4 p-2 bg-background/80 backdrop-blur-sm rounded-md"
                      >
                        <div className="text-xs font-medium">Analyzing posture...</div>
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="flex gap-3 mt-4">
                    <Button 
                      size="lg" 
                      onClick={toggleDetection}
                      className={isActive ? "bg-red-500 hover:bg-red-600" : "bg-prepai-500 hover:bg-prepai-600"}
                    >
                      {isActive ? (
                        <>
                          <PauseCircle className="mr-2 h-5 w-5" />
                          Stop Analysis
                        </>
                      ) : (
                        <>
                          <PlayCircle className="mr-2 h-5 w-5" />
                          Start Analysis
                        </>
                      )}
                    </Button>
                    
                    <Button variant="outline" size="lg" onClick={() => setIsActive(false)}>
                      <RefreshCw className="mr-2 h-5 w-5" />
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Posture Analysis</CardTitle>
                  <CardDescription>Real-time feedback on your body language</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {!isActive ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                      <AlertTriangle className="h-12 w-12 mb-3" />
                      <p>Start analysis to see your posture feedback</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Posture</span>
                          <span>Good</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Hand Gestures</span>
                          <span>Excessive</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Eye Contact</span>
                          <span>Moderate</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Fidgeting</span>
                          <span>Low</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      
                      <div className="mt-6 pt-4 border-t">
                        <p className="font-medium mb-2">Suggestions:</p>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="rounded-full bg-yellow-500 p-1 mt-0.5 h-2 w-2" />
                            <span>Try to reduce hand movements slightly</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="rounded-full bg-green-500 p-1 mt-0.5 h-2 w-2" />
                            <span>Great posture! Keep maintaining your back position</span>
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="md:col-span-3"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Body Language Tips</CardTitle>
                  <CardDescription>Key posture techniques for successful interviews</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {postureTips.map((tip, index) => (
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
        </main>
      </div>
    </div>
  );
};

export default BodyPosturePage;
