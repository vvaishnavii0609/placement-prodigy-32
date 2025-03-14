
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Clock, User, Brain, Calculator, Play } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

interface InterviewSetupFormValues {
  interviewType: 'warmup' | 'hr' | 'technical' | 'aptitude';
  duration: '5' | '20' | '40';
}

const InterviewSetupPage: React.FC = () => {
  const { jobRole } = useParams<{ jobRole: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  
  const form = useForm<InterviewSetupFormValues>({
    defaultValues: {
      interviewType: 'warmup',
      duration: '20',
    },
  });

  const decodedJobRole = jobRole ? decodeURIComponent(jobRole) : 'Unknown Job';

  const handleGenerateQuestions = (values: InterviewSetupFormValues) => {
    setIsGenerating(true);
    
    // Simulate API call to generate questions
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Interview Questions Generated",
        description: `${values.interviewType} questions for ${decodedJobRole} (${values.duration} minutes)`,
      });
      
      // Navigate to the interview session page
      navigate(`/interview/session/${encodeURIComponent(decodedJobRole)}/${values.interviewType}/${values.duration}`);
    }, 1500);
  };

  return (
    <div className="container max-w-4xl py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)} 
        className="mb-6"
      >
        ← Back
      </Button>
      
      <h1 className="text-3xl font-bold mb-2">Interview Setup</h1>
      <p className="text-muted-foreground mb-6">
        Configure your practice interview for {decodedJobRole}
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleGenerateQuestions)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Interview Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Interview Type</CardTitle>
                <CardDescription>
                  Select what type of interview you want to practice
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="interviewType"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="warmup" />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center gap-2">
                            <User className="h-4 w-4 text-prepai-600" />
                            Warm Up (Basic Questions)
                          </FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="hr" />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center gap-2">
                            <User className="h-4 w-4 text-prepai-600" />
                            HR (Behavioral Questions)
                          </FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="technical" />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center gap-2">
                            <Brain className="h-4 w-4 text-prepai-600" />
                            Technical (Role-specific Questions)
                          </FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="aptitude" />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center gap-2">
                            <Calculator className="h-4 w-4 text-prepai-600" />
                            Aptitude (Problem Solving)
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            {/* Duration Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Duration</CardTitle>
                <CardDescription>
                  How long would you like your practice session to be?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="5" />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center gap-2">
                            <Clock className="h-4 w-4 text-prepai-600" />
                            Quick (5 minutes)
                          </FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="20" />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center gap-2">
                            <Clock className="h-4 w-4 text-prepai-600" />
                            Standard (20 minutes)
                          </FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="40" />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center gap-2">
                            <Clock className="h-4 w-4 text-prepai-600" />
                            In-depth (40 minutes)
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8 flex justify-center">
            <Button 
              type="submit" 
              size="lg" 
              className="gap-2" 
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>Generating Questions...</>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Generate Interview Questions
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default InterviewSetupPage;
