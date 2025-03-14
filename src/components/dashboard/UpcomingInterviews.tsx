
import React from 'react';
import { Calendar, Clock, ArrowRight, Briefcase } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const interviews = [
  {
    id: 1,
    title: 'Software Engineer Interview',
    company: 'TechCorp',
    type: 'Technical',
    date: '2023-07-15',
    time: '10:00 AM',
    duration: '45 min',
  },
  {
    id: 2,
    title: 'Data Analyst Interview',
    company: 'DataInsights Inc.',
    type: 'Technical + Behavioral',
    date: '2023-07-17',
    time: '2:30 PM',
    duration: '60 min',
  },
  {
    id: 3,
    title: 'Product Manager Interview',
    company: 'InnovateCo',
    type: 'Behavioral',
    date: '2023-07-20',
    time: '11:15 AM',
    duration: '45 min',
  },
];

const jobOptions = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "UX Designer",
  "Marketing Manager",
  "Sales Representative",
  "Project Manager",
  "Business Analyst",
  "DevOps Engineer",
  "Financial Analyst",
  "HR Manager",
  "Customer Support Specialist"
];

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
  });
};

const UpcomingInterviews: React.FC = () => {
  const navigate = useNavigate();

  const handleJobSelect = (job: string) => {
    navigate(`/interview/setup/${encodeURIComponent(job)}`);
  };

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-prepai-600" />
          Upcoming Interviews
        </CardTitle>
        <CardDescription>
          Your scheduled mock interviews for the next 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>Select job role for practice</span>
                </div>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px] max-h-[400px] overflow-y-auto">
              {jobOptions.map((job) => (
                <DropdownMenuItem 
                  key={job} 
                  onClick={() => handleJobSelect(job)}
                  className="cursor-pointer"
                >
                  {job}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {interviews.length > 0 ? (
          <div className="space-y-4">
            {interviews.map((interview) => (
              <div 
                key={interview.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border gap-4"
              >
                <div>
                  <h4 className="font-medium">{interview.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {interview.company}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {interview.type}
                    </Badge>
                    <div className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {interview.duration}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:items-end gap-2">
                  <div className="text-sm font-medium">
                    {formatDate(interview.date)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {interview.time}
                  </div>
                  <Button size="sm" className="mt-1 sm:mt-0">
                    Prepare
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No upcoming interviews scheduled</p>
            <Button className="mt-4">Schedule Interview</Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end border-t pt-4">
        <Button variant="ghost" size="sm" className="gap-1 text-prepai-600">
          View All <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpcomingInterviews;
