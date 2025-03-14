
import React from 'react';
import NavigationButtons from './NavigationButtons';
import HeaderNotifications from './HeaderNotifications';
import UserMenu from './UserMenu';

interface HeaderProps {
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  const firstName = userName.split(' ')[0];

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
          <NavigationButtons />

          <div className="flex items-center gap-2">
            <HeaderNotifications />
            <UserMenu userName={userName} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
