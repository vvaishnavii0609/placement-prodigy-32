
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Timer, MicOff, Mic, MessageSquare, Send } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// Mock interview questions by type
const mockQuestions = {
  warmup: [
    "Tell me about yourself.",
    "Why are you interested in this position?",
    "What do you know about our company?",
    "What are your greatest strengths?"
  ],
  hr: [
    "Describe a challenging situation at work and how you handled it.",
    "How do you handle stress and pressure?",
    "Tell me about a time you had a conflict with a coworker.",
    "Where do you see yourself in 5 years?"
  ],
  technical: {
    "Software Engineer": [
      "What's the difference between a stack and a queue?",
      "Explain the concept of time complexity.",
      "What design patterns have you used?",
      "Explain how you'd implement a cache."
    ],
    "Data Scientist": [
      "Explain the difference between supervised and unsupervised learning.",
      "How would you handle missing data?",
      "Explain the bias-variance tradeoff.",
      "What evaluation metrics do you use for classification problems?"
    ],
    "Product Manager": [
      "How would you prioritize features?",
      "Describe your process for understanding user needs.",
      "How do you measure product success?",
      "Tell me about a product you launched from concept to release."
    ],
    "default": [
      "Describe your experience with relevant tools in this field.",
      "What methodologies do you follow in your work?",
      "How do you stay updated with industry trends?",
      "Describe a challenging technical problem you solved."
    ]
  },
  aptitude: [
    "If a train travels at 60 mph, how long will it take to travel 240 miles?",
    "A project has a 70% chance of success. If you run the project three times, what's the probability of at least one success?",
    "If 8 people can complete a project in 10 days, how many days would it take 4 people to complete the same project?",
    "There are 3 red balls, 2 blue balls, and 4 green balls in a bag. What's the probability of drawing a red ball?"
  ]
};

const InterviewSessionPage: React.FC = () => {
  const { jobRole, interviewType, duration } = useParams<{ 
    jobRole: string;
    interviewType: string; 
    duration: string;
  }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(parseInt(duration || "20") * 60);
  const [userResponse, setUserResponse] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  
  const decodedJobRole = jobRole ? decodeURIComponent(jobRole) : 'Unknown Job';
  
  // Get the appropriate questions
  const getQuestions = () => {
    if (!interviewType) return mockQuestions.warmup;
    
    if (interviewType === 'technical') {
      const jobQuestions = (mockQuestions.technical as any)[decodedJobRole];
      return jobQuestions || mockQuestions.technical.default;
    }
    
    return (mockQuestions as any)[interviewType] || mockQuestions.warmup;
  };
  
  const questions = getQuestions();
  
  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft]);
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      toast({
        title: "Recording Started",
        description: "Speak clearly to provide your answer.",
      });
    } else {
      toast({
        title: "Recording Stopped",
        description: "Your answer has been saved.",
      });
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserResponse("");
      setFeedback(null);
    } else {
      // End of interview
      navigate(`/interview/results/${encodeURIComponent(decodedJobRole)}`);
    }
  };
  
  const submitResponse = () => {
    // Simulated AI feedback (in a real app, this would call an API)
    setTimeout(() => {
      setFeedback(
        "Good attempt! Consider providing more specific examples and quantifying your impact. Your answer was clear but could benefit from more structure."
      );
    }, 1000);
  };
  
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">{decodedJobRole} Interview</h1>
          <p className="text-muted-foreground">
            {interviewType?.charAt(0).toUpperCase()}{interviewType?.slice(1)} Interview • {duration} minutes
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Timer className="h-5 w-5 text-prepai-600" />
          <span className="font-mono text-lg">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Question {currentQuestion + 1} of {questions.length}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-lg font-medium mb-6">{questions[currentQuestion]}</p>
              
              {feedback && (
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">AI Feedback</h3>
                  <p>{feedback}</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button 
                variant="outline" 
                onClick={toggleRecording}
                className={`gap-2 ${isRecording ? 'bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700' : ''}`}
              >
                {isRecording ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </Button>
              
              <Button onClick={handleNextQuestion}>
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Interview'}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Your Response
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <textarea
                className="w-full h-[200px] p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-prepai-600"
                placeholder="Type your response here or use voice recording..."
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
              />
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button 
                className="w-full gap-2" 
                onClick={submitResponse}
                disabled={!userResponse.trim()}
              >
                <Send className="h-4 w-4" />
                Submit Response for Feedback
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard')}
        >
          End Session
        </Button>
      </div>
    </div>
  );
};

export default InterviewSessionPage;
