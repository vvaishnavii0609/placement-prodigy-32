
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface NavbarProps {
  isLoggedIn?: boolean;
  userName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn = false, userName = '' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRestrictedLink = (e: React.MouseEvent, feature: string) => {
    if (!isLoggedIn) {
      e.preventDefault();
      toast({
        title: "Login Required",
        description: `Please login to access ${feature} features.`,
        variant: "default",
      });
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 py-4",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container-tight flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-prepai-500 text-white font-bold">
            <span className="absolute animate-pulse-glow"></span>
            <span>P</span>
          </div>
          <span className="text-xl font-bold">PrepAI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="nav-link flex items-center gap-1">
                Pricing <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link to="/pricing" className="w-full">
                  View Plans
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/pricing#enterprise" className="w-full">
                  Enterprise
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to={isLoggedIn ? "/interviews" : "/login"}
            className="nav-link flex items-center gap-1"
            onClick={(e) => handleRestrictedLink(e, "interview")}
          >
            Interviews
          </Link>

          <Link
            to={isLoggedIn ? "/communication" : "/login"}
            className="nav-link flex items-center gap-1"
            onClick={(e) => handleRestrictedLink(e, "communication")}
          >
            Communication Skills
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 relative">
                  <div className="w-8 h-8 rounded-full bg-prepai-500 text-white flex items-center justify-center">
                    {userName.slice(0, 1).toUpperCase()}
                  </div>
                  <span>Hi, {userName.split(' ')[0]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="w-full">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/billing" className="w-full">Billing</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/logout" className="w-full">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t z-40 md:hidden animate-slide-down">
            <div className="container py-4 flex flex-col gap-4">
              <Link 
                to="/pricing"
                className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                to={isLoggedIn ? "/interviews" : "/login"}
                className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
                onClick={(e) => {
                  handleRestrictedLink(e, "interview");
                  setMobileMenuOpen(false);
                }}
              >
                Interviews
              </Link>
              <Link 
                to={isLoggedIn ? "/communication" : "/login"}
                className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
                onClick={(e) => {
                  handleRestrictedLink(e, "communication");
                  setMobileMenuOpen(false);
                }}
              >
                Communication Skills
              </Link>
              <div className="border-t pt-4 mt-2">
                {isLoggedIn ? (
                  <>
                    <div className="px-4 py-2 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-prepai-500 text-white flex items-center justify-center">
                        {userName.slice(0, 1).toUpperCase()}
                      </div>
                      <span>Hi, {userName.split(' ')[0]}</span>
                    </div>
                    <Link
                      to="/dashboard"
                      className="px-4 py-2 hover:bg-muted rounded-md transition-colors block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="px-4 py-2 hover:bg-muted rounded-md transition-colors block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/logout"
                      className="px-4 py-2 hover:bg-muted rounded-md transition-colors block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Logout
                    </Link>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                        Login
                      </Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
