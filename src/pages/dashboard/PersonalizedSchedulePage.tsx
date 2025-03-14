
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Check, Clock, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { motion } from 'framer-motion';

type TaskStatus = 'pending' | 'completed';

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  time?: string;
}

const PersonalizedSchedulePage: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Data Structures Mock Interview',
      description: 'Practice binary trees and graph algorithms',
      status: 'pending',
      time: '10:00 AM'
    },
    {
      id: '2',
      title: 'Resume Update',
      description: 'Add recent project experience and update skills section',
      status: 'completed',
      time: '1:00 PM'
    },
    {
      id: '3',
      title: 'System Design Study',
      description: 'Read chapter on distributed systems',
      status: 'pending',
      time: '3:30 PM'
    }
  ]);
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    time: ''
  });
  
  const handleAddTask = () => {
    if (!newTask.title) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      status: 'pending',
      time: newTask.time
    };
    
    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', time: '' });
  };
  
  const toggleTaskStatus = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' } 
        : task
    ));
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <h1 className="text-2xl font-bold text-prepai-800">Personalized Schedule</h1>
            <p className="text-muted-foreground">Plan your interview preparation journey</p>
          </motion.div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:col-span-1"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-prepai-600" />
                    Calendar
                  </CardTitle>
                  <CardDescription>Select a date to view or add tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Add New Task</h3>
                    <div className="space-y-3">
                      <Input 
                        placeholder="Task title" 
                        value={newTask.title}
                        onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      />
                      <Textarea 
                        placeholder="Description" 
                        value={newTask.description}
                        onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                        className="resize-none"
                        rows={3}
                      />
                      <Input 
                        placeholder="Time (e.g., 3:00 PM)" 
                        value={newTask.time}
                        onChange={(e) => setNewTask({...newTask, time: e.target.value})}
                      />
                      <Button 
                        onClick={handleAddTask} 
                        className="w-full"
                        disabled={!newTask.title}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Task
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-2"
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-prepai-600" />
                      <span>Tasks for {date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <Badge variant="outline" className="bg-prepai-50 text-prepai-700 hover:bg-prepai-100">
                      {tasks.filter(t => t.status === 'completed').length}/{tasks.length} Completed
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div 
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-4"
                  >
                    {tasks.length > 0 ? (
                      tasks.map((task) => (
                        <motion.div key={task.id} variants={item}>
                          <div className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/30 transition-colors">
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`rounded-full shrink-0 ${
                                task.status === 'completed' 
                                  ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200 hover:text-emerald-700' 
                                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                              }`}
                              onClick={() => toggleTaskStatus(task.id)}
                            >
                              <Check className={`h-4 w-4 ${task.status === 'completed' ? 'opacity-100' : 'opacity-30'}`} />
                            </Button>
                            
                            <div className="flex-1">
                              <h3 className={`font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                                {task.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {task.description}
                              </p>
                              {task.time && (
                                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                                  <Clock className="mr-1 h-3 w-3" />
                                  {task.time}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-10">
                        <p className="text-muted-foreground">No tasks scheduled for this day</p>
                        <Button className="mt-4">Add Your First Task</Button>
                      </div>
                    )}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PersonalizedSchedulePage;
