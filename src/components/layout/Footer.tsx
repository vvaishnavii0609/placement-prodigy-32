
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle message submission
    console.log('Message submitted');
  };
  
  return (
    <footer className="bg-prepai-800 text-white">
      <div className="container-tight py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-white text-prepai-500 font-bold">
                <span className="absolute animate-pulse-glow"></span>
                <span>P</span>
              </div>
              <span className="text-xl font-bold">PrepAI</span>
            </div>
            <p className="text-muted-foreground text-sm">
              AI-powered interview preparation platform helping professionals and students master their placement interviews.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-prepai-700 hover:bg-prepai-600 transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-prepai-700 hover:bg-prepai-600 transition-colors"
              >
                <Twitter size={16} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-prepai-700 hover:bg-prepai-600 transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-prepai-700 hover:bg-prepai-600 transition-colors"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/pricing" className="block text-sm text-muted-foreground hover:text-white transition-colors">
                Pricing
              </Link>
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-white transition-colors">
                About Us
              </Link>
              <Link to="/blog" className="block text-sm text-muted-foreground hover:text-white transition-colors">
                Blog
              </Link>
              <Link to="/faq" className="block text-sm text-muted-foreground hover:text-white transition-colors">
                FAQ
              </Link>
            </div>
          </div>
          
          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Features</h3>
            <div className="space-y-2">
              <Link to="/interviews" className="block text-sm text-muted-foreground hover:text-white transition-colors">
                AI Interviews
              </Link>
              <Link to="/communication" className="block text-sm text-muted-foreground hover:text-white transition-colors">
                Communication Skills
              </Link>
              <Link to="/resume" className="block text-sm text-muted-foreground hover:text-white transition-colors">
                Resume Analyzer
              </Link>
              <Link to="/analytics" className="block text-sm text-muted-foreground hover:text-white transition-colors">
                Performance Analytics
              </Link>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input 
                placeholder="Your message" 
                className="bg-prepai-700 border-prepai-600 placeholder:text-prepai-400 text-white"
              />
              <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600">
                <Send className="mr-2 h-4 w-4" /> Send Message
              </Button>
            </form>
            <div className="text-sm text-muted-foreground">
              <p>contact@prepai.com</p>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
        </div>
        
        <Separator className="my-8 bg-prepai-700" />
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} PrepAI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
