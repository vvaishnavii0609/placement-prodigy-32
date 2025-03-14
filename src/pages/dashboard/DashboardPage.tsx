
import React from 'react';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import UpcomingInterviews from '@/components/dashboard/UpcomingInterviews';
import Stats from '@/components/dashboard/Stats';
import ResumeAnalyzer from '@/components/dashboard/ResumeAnalyzer';

const DashboardPage: React.FC = () => {
  // Using a mock username, in a real app this would come from authentication
  const userName = "John Doe";

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header userName={userName} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-2">
              <Stats />
            </div>
            <div className="col-span-1">
              <UpcomingInterviews />
            </div>
            <div className="col-span-2">
              <ResumeAnalyzer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
