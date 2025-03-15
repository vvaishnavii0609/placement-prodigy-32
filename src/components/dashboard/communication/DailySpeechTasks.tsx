
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Mic, Play, Clock, CheckCircle, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const tasks = [
  {
    id: 1,
    title: 'Pronunciation Practice',
    description: 'Practice pronouncing these challenging words clearly',
    completed: false,
    duration: '5 min',
    content: 'Particularly, specifically, statistical, phenomenon, entrepreneur, auxiliary, fifth, twelfth, synthesize, anonymity',
    progress: 0
  },
  {
    id: 2,
    title: 'Pacing Exercise',
    description: 'Read this passage at a steady, moderate pace',
    completed: false,
    duration: '3 min',
    content: 'The ability to speak clearly and at an appropriate pace is crucial for effective communication. When we speak too quickly, our audience may miss important details. When we speak too slowly, they might lose interest.',
    progress: 0
  },
  {
    id: 3,
    title: 'Filler Word Reduction',
    description: 'Practice speaking without using filler words',
    completed: true,
    duration: '4 min',
    content: 'Describe your ideal work environment without using filler words like "um", "uh", "like", or "you know".',
    progress: 100
  },
  {
    id: 4,
    title: 'Voice Modulation',
    description: 'Practice varying your tone and pitch',
    completed: false,
    duration: '6 min',
    content: 'Read the same sentence with different emotions: happy, serious, questioning, surprised, and authoritative.',
    progress: 0
  },
];

const DailySpeechTasks: React.FC = () => {
  const [activeTasks, setActiveTasks] = useState(tasks);
  
  const completeTask = (id: number) => {
    setActiveTasks(activeTasks.map(task => 
      task.id === id ? { ...task, completed: true, progress: 100 } : task
    ));
  };
  
  const resetTasks = () => {
    setActiveTasks(tasks.map(task => ({ ...task, completed: false, progress: 0 })));
  };
  
  const completedCount = activeTasks.filter(task => task.completed).length;
  const completionPercentage = (completedCount / activeTasks.length) * 100;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Daily Speech Exercises</span>
          <Badge variant={completedCount === activeTasks.length ? "default" : "outline"}>
            {completedCount}/{activeTasks.length} Completed
          </Badge>
        </CardTitle>
        <CardDescription>
          Complete these exercises daily to improve your speech patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between mb-1 text-sm">
            <span>Today's Progress</span>
            <span>{completionPercentage.toFixed(0)}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
        
        <div className="space-y-4">
          {activeTasks.map((task) => (
            <div key={task.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium flex items-center">
                    {task.title}
                    {task.completed && <CheckCircle className="h-4 w-4 ml-2 text-green-500" />}
                  </h3>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{task.duration}</span>
                </div>
              </div>
              
              <div className="bg-muted/50 rounded-md p-3 my-3 text-sm">
                {task.content}
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex-1 mr-4">
                  <Progress value={task.progress} className="h-1.5" />
                </div>
                <Button 
                  size="sm" 
                  variant={task.completed ? "outline" : "default"} 
                  className="gap-1"
                  disabled={task.completed}
                  onClick={() => completeTask(task.id)}
                >
                  {task.completed ? (
                    <>
                      <CheckCircle className="h-4 w-4" /> Completed
                    </>
                  ) : (
                    <>
                      {task.id % 2 === 0 ? <Play className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      Start Exercise
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={resetTasks}>Reset All</Button>
        <Button className="gap-1">
          <BarChart3 className="h-4 w-4" />
          View Progress History
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DailySpeechTasks;
