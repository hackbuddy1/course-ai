import "./global.css";

import { Toaster } from "./components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Loading from "./pages/Loading";
import Course from "./pages/Course";
import NotFound from "./pages/NotFound";
import CoursePromptPage from "./pages/CoursePromptPage";
import CourseViewerPage from "./pages/CourseViewerPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
  <Route path="/" element={<Index />} />
  <Route path="/loading" element={<Loading />} />
  <Route path="/course/:id" element={<Course />} />

  {/* 🔽 Add these two lines below */}
  <Route path="/generate" element={<CoursePromptPage />} />
  <Route path="/course-viewer" element={<CourseViewerPage />} />

  <Route path="*" element={<NotFound />} />
</Routes>

      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
