
import React from 'react';
import { Target, Briefcase, FileText, LineChart, RotateCw } from 'lucide-react';

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description, delay }) => {
  return (
    <div 
      className={`benefit-card animate-fade-in`} 
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-6">
        <div className="w-12 h-12 rounded-lg bg-prepai-100 text-prepai-600 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="group pt-4 border-t border-border">
        <span className="text-sm font-medium text-prepai-600 group-hover:underline cursor-pointer flex items-center">
          Learn more
          <RotateCw className="ml-1 h-3 w-3 animate-spin group-hover:opacity-100 opacity-0 transition-opacity" />
        </span>
      </div>
    </div>
  );
};

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Ultimate Interview Mastery",
      description: "Practice with AI-generated interviews tailored to your target role and experience level. Receive instant feedback on your answers."
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Company-Specific Practice",
      description: "Prepare for interviews at specific companies with customized question sets based on real interview experiences and company culture."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Resume-Based Interviews",
      description: "Upload your resume and practice interviews with questions tailored to your experience, highlighting your strengths and preparing for weaknesses."
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Actionable Analytics",
      description: "Track your progress with detailed performance metrics, identify improvement areas, and receive personalized recommendations."
    }
  ];

  return (
    <section className="section bg-white">
      <div className="container-tight">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-prepai-100 text-prepai-600 text-sm font-medium">
            Our Benefits
          </div>
          <h2 className="heading-lg mb-4">AI-Enabled Placement Preparation Platform</h2>
          <p className="text-lg text-muted-foreground">
            PrepAI leverages artificial intelligence to provide a comprehensive interview preparation experience that adapts to your needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => (
            <BenefitCard 
              key={i}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              delay={i * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
