
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: '/images/mock-interview.jpg',
      alt: 'Virtual AI Interview',
    },
    {
      image: '/images/analytics-dashboard.jpg',
      alt: 'Analytics Dashboard',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative min-h-screen pt-24 pb-16 flex items-center bg-gradient-to-br from-prepai-50 to-teal-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-prepai-200 filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-teal-200 filter blur-3xl opacity-20 animate-float animation-delay-200"></div>
      </div>
      
      <div className="container-tight relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Hero Content */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="inline-block px-4 py-2 rounded-full bg-prepai-100 text-prepai-800 font-medium animate-fade-in">
            AI-Powered Interview Preparation
          </div>
          
          <h1 className="heading-xl animate-fade-in animate-delay-100">
            Face your interviews with <span className="gradient-text">PrepAI</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 animate-fade-in animate-delay-200">
            Master your next interview with our AI-driven platform. Get personalized feedback, practice with realistic scenarios, and land your dream job.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in animate-delay-300">
            <Button size="lg" asChild className="rounded-full">
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="rounded-full group">
              <Link to="/pricing" className="flex items-center">
                View Pricing
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Hero Image Carousel */}
        <div className="relative w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-xl animate-fade-in animate-delay-400">
          <div className="absolute inset-0 p-2 bg-gradient-to-tr from-prepai-500/10 to-transparent rounded-2xl"></div>
          
          <div 
            className="carousel-track h-full w-full" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="carousel-slide h-full w-full flex-shrink-0">
                <div className="w-full h-full bg-gray-200 rounded-xl overflow-hidden">
                  <img 
                    src={slide.image} 
                    alt={slide.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070';
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Carousel Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
