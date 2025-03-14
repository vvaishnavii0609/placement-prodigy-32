
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  Calendar,
  Route,
  Clock,
  BriefcaseBusiness,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, isActive, onClick }) => {
  return (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
        isActive 
          ? 'bg-prepai-100 text-prepai-700' 
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
      {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
    </Link>
  );
};

interface SidebarProps {
  onMobileClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onMobileClose }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { to: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard' },
    { to: '/dashboard/performance', icon: <BarChart3 className="h-5 w-5" />, label: 'Past Performance' },
    { to: '/dashboard/schedule', icon: <Calendar className="h-5 w-5" />, label: 'Personalized Schedule' },
    { to: '/dashboard/journey', icon: <Route className="h-5 w-5" />, label: 'Personalized Journey' },
    { to: '/dashboard/reminders', icon: <Clock className="h-5 w-5" />, label: 'Reminders' },
    { to: '/dashboard/roles', icon: <BriefcaseBusiness className="h-5 w-5" />, label: 'Requested Roles' },
  ];
  
  return (
    <div className="flex flex-col h-full border-r bg-card">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-prepai-500 text-white flex items-center justify-center font-bold">
            P
          </div>
          <span className="text-xl font-semibold">PrepAI</span>
        </div>
        
        <ScrollArea className="flex-1 h-[calc(100vh-14rem)]">
          <div className="space-y-1 px-2">
            {navItems.map((item) => (
              <SidebarLink
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                isActive={isActive(item.to)}
                onClick={onMobileClose}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
      
      <div className="mt-auto p-4 border-t">
        <div className="space-y-1 px-2">
          <SidebarLink
            to="/settings"
            icon={<Settings className="h-5 w-5" />}
            label="Settings"
            isActive={isActive('/settings')}
            onClick={onMobileClose}
          />
          <Button
            variant="ghost"
            className="w-full justify-start px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            onClick={() => {
              // Handle logout
            }}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
