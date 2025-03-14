
import React from 'react';
import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HeaderNotifications: React.FC = () => {
  return (
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
  );
};

export default HeaderNotifications;
