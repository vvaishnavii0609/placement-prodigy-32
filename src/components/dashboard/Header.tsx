
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, MessageSquare, Video, BarChart3, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  const navigate = useNavigate();
  const firstName = userName.split(' ')[0];
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
      <div className="flex flex-1 items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">
            Hi, <span className="text-prepai-600">{firstName}</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Welcome back to your interview preparation dashboard
          </p>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="text-prepai-600 hover:text-prepai-700 hover:bg-prepai-50"
              >
                <Video className="h-4 w-4 mr-2" />
                Communication Skills
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => navigate('/dashboard/communication/body-posture')}>
                Body Posture Detection
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/dashboard/communication/speech')}>
                Speech Detection
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button
            variant="outline"
            className="text-prepai-600 hover:text-prepai-700 hover:bg-prepai-50"
            onClick={() => navigate('/interviews')}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Interviews
          </Button>
          
          <Button
            variant="outline"
            className="text-prepai-600 hover:text-prepai-700 hover:bg-prepai-50"
            onClick={() => navigate('/chatbot')}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Chatbot
          </Button>
          
          <Button
            variant="outline"
            className="text-prepai-600 hover:text-prepai-700 hover:bg-prepai-50"
            onClick={() => navigate('/tests')}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Tests
          </Button>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-auto">
                  <DropdownMenuItem className="cursor-pointer flex items-start gap-4 py-3">
                    <Badge variant="secondary" className="mt-1 rounded-full">New</Badge>
                    <div>
                      <p className="font-medium">Interview Reminder</p>
                      <p className="text-sm text-muted-foreground">Your mock interview for Software Engineer role is scheduled in 1 hour.</p>
                      <p className="text-xs text-muted-foreground mt-1">10 minutes ago</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer flex items-start gap-4 py-3">
                    <Badge variant="secondary" className="mt-1 rounded-full">New</Badge>
                    <div>
                      <p className="font-medium">Resume Analysis Complete</p>
                      <p className="text-sm text-muted-foreground">Your resume analysis is ready. View the detailed feedback now.</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer flex items-start gap-4 py-3">
                    <Badge variant="secondary" className="mt-1 rounded-full">New</Badge>
                    <div>
                      <p className="font-medium">Daily Practice Reminder</p>
                      <p className="text-sm text-muted-foreground">Don't forget your daily interview practice session!</p>
                      <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                    </div>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-center text-sm font-medium text-prepai-600">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src="/avatar.png" />
                    <AvatarFallback className="bg-prepai-500 text-white">{initials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>Dashboard</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/profile')}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/billing')}>Billing</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/settings')}>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/logout')}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
