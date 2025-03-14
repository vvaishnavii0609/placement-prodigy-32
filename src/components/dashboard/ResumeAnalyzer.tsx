
import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertTriangle, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const ResumeAnalyzer: React.FC = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
    } else {
      toast({
        title: "Invalid file",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else if (selectedFile) {
      toast({
        title: "Invalid file",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
    }
  };
  
  const handleAnalyze = () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    setProgress(0);
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            setAnalysisComplete(true);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };
  
  const handleRemoveFile = () => {
    setFile(null);
    setAnalysisComplete(false);
  };
  
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-prepai-600" />
          Resume Analyzer
        </CardTitle>
        <CardDescription>
          Upload your resume to get AI-powered feedback and improvement suggestions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!file ? (
          <div 
            className={`border-2 border-dashed rounded-lg p-6 text-center ${
              isDragging ? 'border-prepai-500 bg-prepai-50' : 'border-muted'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium">Upload your resume</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop your PDF file here, or click to browse
            </p>
            <Button asChild variant="outline">
              <label className="cursor-pointer">
                Browse Files
                <input 
                  type="file" 
                  accept=".pdf" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
              </label>
            </Button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(file.size / 1024)} KB
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleRemoveFile}
                disabled={isAnalyzing}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            {isAnalyzing ? (
              <div className="space-y-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Analyzing...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            ) : analysisComplete ? (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 text-emerald-700 rounded-lg flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-0.5" />
                  <div>
                    <p className="font-medium">Analysis Complete</p>
                    <p className="text-sm">Your resume has been analyzed successfully.</p>
                  </div>
                </div>
                
                <div className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-medium mb-2">Resume Score</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-14 h-14 rounded-full border-4 border-prepai-500 flex items-center justify-center font-bold text-lg">
                        78
                      </div>
                      <div className="text-sm">
                        <p>Your resume is <span className="font-medium">good</span></p>
                        <p className="text-muted-foreground">
                          Top 35% compared to similar profiles
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-2">Key Improvements</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                        <span>Add more quantifiable achievements to your work experience</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                        <span>Include relevant technical skills for software engineering roles</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                        <span>Make your resume more ATS-friendly with standard sections</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>
                      View Full Analysis
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <Button onClick={handleAnalyze} className="w-full">
                Analyze Resume
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeAnalyzer;
