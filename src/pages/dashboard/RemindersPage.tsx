
import React, { useState } from 'react';
import { Check, Bell, Clock, Plus, Calendar, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface Reminder {
  id: string;
  title: string;
  time: string;
  date: string;
  type: 'practice' | 'interview' | 'study';
  completed: boolean;
}

const RemindersPage: React.FC = () => {
  const { toast } = useToast();
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'System Design Practice',
      time: '10:00 AM',
      date: '2023-07-15',
      type: 'practice',
      completed: false
    },
    {
      id: '2',
      title: 'Mock Interview with AI',
      time: '2:30 PM',
      date: '2023-07-15',
      type: 'interview',
      completed: false
    },
    {
      id: '3',
      title: 'Review Algorithms',
      time: '6:00 PM',
      date: '2023-07-15',
      type: 'study',
      completed: true
    }
  ]);
  
  const [newReminder, setNewReminder] = useState({
    title: '',
    time: '',
    date: '',
    type: 'practice' as const
  });
  
  const handleAddReminder = () => {
    if (!newReminder.title || !newReminder.time || !newReminder.date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all the reminder details",
        variant: "destructive"
      });
      return;
    }
    
    const reminder: Reminder = {
      id: Date.now().toString(),
      title: newReminder.title,
      time: newReminder.time,
      date: newReminder.date,
      type: newReminder.type,
      completed: false
    };
    
    setReminders([...reminders, reminder]);
    setNewReminder({
      title: '',
      time: '',
      date: '',
      type: 'practice'
    });
    
    toast({
      title: "Reminder Added",
      description: "Your reminder has been set successfully",
    });
  };
  
  const toggleReminderStatus = (id: string) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id 
        ? { ...reminder, completed: !reminder.completed } 
        : reminder
    ));
    
    const reminder = reminders.find(r => r.id === id);
    if (reminder) {
      toast({
        title: reminder.completed ? "Reminder Active" : "Reminder Completed",
        description: `${reminder.title} marked as ${reminder.completed ? 'active' : 'completed'}`,
      });
    }
  };
  
  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
    toast({
      title: "Reminder Deleted",
      description: "Your reminder has been removed",
    });
  };
  
  // Framer Motion Variants
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
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'practice':
        return 'bg-prepai-100 text-prepai-700';
      case 'interview':
        return 'bg-purple-100 text-purple-700';
      case 'study':
        return 'bg-teal-100 text-teal-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
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
            <h1 className="text-2xl font-bold text-prepai-800">Reminders</h1>
            <p className="text-muted-foreground">Stay on track with your interview preparation</p>
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
                    <Plus className="h-5 w-5 text-prepai-600" />
                    Add New Reminder
                  </CardTitle>
                  <CardDescription>Schedule your interview preparation activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input 
                        id="title"
                        placeholder="e.g., Practice Algorithms" 
                        value={newReminder.title}
                        onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input 
                        id="date"
                        type="date"
                        value={newReminder.date}
                        onChange={(e) => setNewReminder({...newReminder, date: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input 
                        id="time"
                        type="time"
                        value={newReminder.time}
                        onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select 
                        value={newReminder.type}
                        onValueChange={(value: any) => setNewReminder({...newReminder, type: value})}
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="practice">Practice</SelectItem>
                          <SelectItem value="interview">Interview</SelectItem>
                          <SelectItem value="study">Study</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button 
                      onClick={handleAddReminder}
                      className="w-full mt-4"
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Create Reminder
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-prepai-600" />
                    Notification Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Push Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email Reminders</h4>
                        <p className="text-sm text-muted-foreground">Get reminders via email</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">SMS Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive text alerts</p>
                      </div>
                      <Switch />
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
                      <Calendar className="h-5 w-5 text-prepai-600" />
                      <span>Your Reminders</span>
                    </div>
                    <Badge variant="outline" className="bg-prepai-50 text-prepai-700 hover:bg-prepai-100">
                      {reminders.filter(r => r.completed).length}/{reminders.length} Completed
                    </Badge>
                  </CardTitle>
                  <CardDescription>Upcoming activities and deadlines</CardDescription>
                </CardHeader>
                <CardContent>
                  <motion.div 
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-4"
                  >
                    {reminders.length > 0 ? (
                      reminders.map((reminder) => (
                        <motion.div key={reminder.id} variants={item}>
                          <div className={`flex items-start gap-4 p-4 rounded-lg border ${reminder.completed ? 'bg-muted/20' : 'hover:bg-muted/30'} transition-colors`}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`rounded-full shrink-0 ${
                                reminder.completed 
                                  ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200 hover:text-emerald-700' 
                                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                              }`}
                              onClick={() => toggleReminderStatus(reminder.id)}
                            >
                              <Check className={`h-4 w-4 ${reminder.completed ? 'opacity-100' : 'opacity-30'}`} />
                            </Button>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className={`font-medium ${reminder.completed ? 'line-through text-muted-foreground' : ''}`}>
                                  {reminder.title}
                                </h3>
                                <Badge className={getTypeColor(reminder.type)} variant="secondary">
                                  {reminder.type}
                                </Badge>
                              </div>
                              
                              <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Calendar className="mr-1 h-3 w-3" />
                                  {new Date(reminder.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="mr-1 h-3 w-3" />
                                  {reminder.time}
                                </div>
                              </div>
                            </div>
                            
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-muted-foreground hover:text-destructive"
                              onClick={() => deleteReminder(reminder.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-10">
                        <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                        <p className="text-lg font-medium">No reminders yet</p>
                        <p className="text-muted-foreground">Set your first reminder to stay on track</p>
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

export default RemindersPage;
