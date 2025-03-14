
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Alex Johnson",
      position: "Software Engineer",
      company: "TechCorp",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      content: "PrepAI completely transformed my interview preparation. The AI-generated questions were spot on for my software engineering role, and the feedback helped me identify weak areas I wouldn't have noticed otherwise.",
      rating: 5
    },
    {
      id: 2,
      name: "Sarah Williams",
      position: "Data Analyst",
      company: "DataViz Inc.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      content: "After just two weeks with PrepAI, I was able to ace my data analyst interview. The personalized feedback and company-specific questions gave me a huge advantage over other candidates.",
      rating: 5
    },
    {
      id: 3,
      name: "Michael Chen",
      position: "Product Manager",
      company: "InnovateCo",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      content: "The communication skills analysis was a game-changer for me. I didn't realize how many filler words I was using until PrepAI pointed it out. My delivery is now much more confident and polished.",
      rating: 4
    },
    {
      id: 4,
      name: "Priya Patel",
      position: "HR Specialist",
      company: "Global Staffing",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
      content: "From an HR perspective, I'm impressed with how PrepAI simulates real interview scenarios. I've recommended it to numerous candidates, and they all report significant improvements in their performance.",
      rating: 5
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="section bg-gradient-to-b from-prepai-50 to-transparent">
      <div className="container-tight">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-prepai-100 text-prepai-600 text-sm font-medium">
            Success Stories
          </div>
          <h2 className="heading-lg mb-4">What Our Users Say</h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of professionals who have transformed their interview skills with PrepAI.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div 
            className="rounded-2xl p-8 md:p-12 bg-white shadow-card border border-border"
            style={{ height: '400px' }}
          >
            <div className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 w-24 h-24 bg-prepai-100 rounded-xl opacity-50"></div>
            <div className="absolute bottom-0 right-0 transform translate-x-4 translate-y-4 w-24 h-24 bg-teal-100 rounded-xl opacity-50"></div>
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  {Array.from({ length: 5 - testimonials[activeIndex].rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-gray-300" />
                  ))}
                </div>
                
                <p className="text-xl italic">"{testimonials[activeIndex].content}"</p>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonials[activeIndex].avatar} 
                    alt={testimonials[activeIndex].name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonials[activeIndex].name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[activeIndex].position}, {testimonials[activeIndex].company}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={prevTestimonial}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={nextTestimonial}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Company Logos */}
        <div className="mt-20">
          <h3 className="text-center text-lg font-medium text-muted-foreground mb-8">
            Trusted by professionals from leading companies
          </h3>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix'].map((company) => (
              <div 
                key={company} 
                className="text-xl md:text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
