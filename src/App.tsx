
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import PastPerformancePage from "./pages/dashboard/PastPerformancePage";
import PersonalizedSchedulePage from "./pages/dashboard/PersonalizedSchedulePage";
import RemindersPage from "./pages/dashboard/RemindersPage";
import BodyPosturePage from "./pages/dashboard/communication/BodyPosturePage";
import SpeechDetectionPage from "./pages/dashboard/communication/SpeechDetectionPage";
import InterviewSetupPage from "./pages/interview/InterviewSetupPage";
import InterviewSessionPage from "./pages/interview/InterviewSessionPage";
import InterviewResultsPage from "./pages/interview/InterviewResultsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/performance" element={<PastPerformancePage />} />
          <Route path="/dashboard/schedule" element={<PersonalizedSchedulePage />} />
          <Route path="/dashboard/reminders" element={<RemindersPage />} />
          <Route path="/dashboard/communication/body-posture" element={<BodyPosturePage />} />
          <Route path="/dashboard/communication/speech" element={<SpeechDetectionPage />} />
          
          {/* New Interview Routes */}
          <Route path="/interview/setup/:jobRole" element={<InterviewSetupPage />} />
          <Route path="/interview/session/:jobRole/:interviewType/:duration" element={<InterviewSessionPage />} />
          <Route path="/interview/results/:jobRole" element={<InterviewResultsPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
