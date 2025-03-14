
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.2,
        duration: 0.6
      }
    })
  };

  return (
    <section className="relative min-h-screen pt-24 pb-16 flex items-center bg-gradient-to-br from-prepai-50 via-teal-50 to-purple-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-prepai-200 filter blur-3xl opacity-30"
          animate={{ 
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-teal-200 filter blur-3xl opacity-20"
          animate={{ 
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1 
          }}
        />
        <motion.div 
          className="absolute top-60 right-40 w-48 h-48 rounded-full bg-purple-200 filter blur-3xl opacity-20"
          animate={{ 
            y: [0, 20, 0],
            x: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        />
      </div>
      
      <div className="container-tight relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Hero Content */}
        <div className="space-y-8 text-center lg:text-left">
          <motion.div 
            className="inline-block px-4 py-2 rounded-full bg-prepai-100 text-prepai-800 font-medium"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={0}
          >
            AI-Powered Interview Preparation
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-prepai-700 via-teal-600 to-purple-600"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={1}
          >
            Face your interviews with <span className="text-prepai-600">PrepAI</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={2}
          >
            Master your next interview with our AI-driven platform. Get personalized feedback, practice with realistic scenarios, and land your dream job.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={3}
          >
            <Button size="lg" asChild className="rounded-full bg-gradient-to-r from-prepai-600 to-teal-600 hover:from-prepai-700 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all">
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="rounded-full group border-prepai-500 text-prepai-700 hover:bg-prepai-50">
              <Link to="/pricing" className="flex items-center">
                View Pricing
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
        
        {/* Hero Image Carousel */}
        <motion.div 
          className="relative w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.div 
            className="absolute inset-0 p-2 bg-gradient-to-tr from-prepai-500/20 to-purple-500/10 rounded-2xl"
            animate={{ 
              background: [
                "linear-gradient(to top right, rgba(32, 112, 224, 0.2), rgba(147, 51, 234, 0.1))",
                "linear-gradient(to top right, rgba(16, 192, 144, 0.2), rgba(32, 112, 224, 0.1))",
                "linear-gradient(to top right, rgba(147, 51, 234, 0.2), rgba(16, 192, 144, 0.1))",
                "linear-gradient(to top right, rgba(32, 112, 224, 0.2), rgba(147, 51, 234, 0.1))"
              ]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity 
            }}
          />
          
          <div 
            className="carousel-track h-full w-full flex" 
            style={{ transform: `translateX(-${currentSlide * 100}%)`, transition: 'transform 0.6s ease-out' }}
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
              <motion.button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
                }`}
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
