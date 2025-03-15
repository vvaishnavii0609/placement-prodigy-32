
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Video, BarChart3, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const NavigationButtons: React.FC = () => {
  const navigate = useNavigate();

  return (
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
          <DropdownMenuItem onClick={() => navigate('/dashboard/communication/mock-interview')}>
            Mock Interview Simulator
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
    </div>
  );
};

export default NavigationButtons;
