
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, AlertTriangle, BarChart, Download, ArrowRight } from 'lucide-react';

const InterviewResultsPage: React.FC = () => {
  const { jobRole } = useParams<{ jobRole: string }>();
  const navigate = useNavigate();
  
  const decodedJobRole = jobRole ? decodeURIComponent(jobRole) : 'Unknown Job';

  // Mock data for demonstration
  const feedbackPoints = [
    {
      type: 'strength',
      text: 'Strong introduction and clear articulation of relevant experience.'
    },
    {
      type: 'strength',
      text: 'Good use of specific examples to highlight achievements.'
    },
    {
      type: 'area',
      text: 'Consider providing more quantitative impact in your responses.'
    },
    {
      type: 'area',
      text: 'Some answers could be more concise and focused.'
    },
  ];

  const scoreData = {
    overall: 82,
    categories: {
      'Content': 85,
      'Delivery': 78,
      'Engagement': 88,
      'Structure': 79
    }
  };

  return (
    <div className="container py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/dashboard')} 
        className="mb-6"
      >
        ← Back to Dashboard
      </Button>

      <h1 className="text-3xl font-bold mb-2">Interview Results</h1>
      <p className="text-muted-foreground mb-6">
        Your performance for {decodedJobRole} interview
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Performance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border p-4 mb-6">
              <h3 className="text-lg font-medium mb-4">Key Takeaways</h3>
              <ul className="space-y-3">
                {feedbackPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    {point.type === 'strength' ? (
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    )}
                    <span>{point.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <h3 className="text-lg font-medium mb-3">Detailed Feedback</h3>
            <p className="text-muted-foreground">
              In your interview for the {decodedJobRole} role, you demonstrated good knowledge of the field and communicated your experience effectively. Your answers to technical questions showed competency, though some responses could be more detailed. 
            </p>
            <p className="text-muted-foreground mt-2">
              For behavioral questions, you provided good examples but could improve on showcasing problem-solving processes. Consider using the STAR method (Situation, Task, Action, Result) more consistently.
            </p>

            <div className="mt-6 flex justify-end">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download Full Report
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Performance Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="10"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * scoreData.overall) / 100}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute text-3xl font-bold">
                  {scoreData.overall}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {Object.entries(scoreData.categories).map(([category, score]) => (
                <div key={category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{category}</span>
                    <span className="font-medium">{score}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-prepai-600 h-2 rounded-full"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center gap-4">
        <Button 
          onClick={() => navigate(`/interview/setup/${encodeURIComponent(decodedJobRole)}`)}
          className="gap-2"
        >
          Try Again
        </Button>
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </Button>
      </div>

      <div className="mt-10 border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">Recommended Practice</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Technical Skills', 'Communication', 'Problem Solving'].map((area) => (
            <Card key={area} className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-4 flex justify-between items-center">
                <span>{area}</span>
                <ArrowRight className="h-4 w-4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewResultsPage;
