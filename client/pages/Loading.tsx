import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Brain, Search, BookOpen, Video, FileText, Check } from "lucide-react";

interface LocationState {
  topic: string;
}

const steps = [
  { icon: Search, text: "Searching the web for content", delay: 0 },
  { icon: Video, text: "Finding relevant videos", delay: 2000 },
  { icon: FileText, text: "Curating documents and guides", delay: 4000 },
  { icon: BookOpen, text: "Structuring your course modules", delay: 6000 },
];

export default function Loading() {
  const navigate = useNavigate();
  const location = useLocation();
  const { topic } = (location.state as LocationState) || {
    topic: "your course",
  };

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Simulate course generation process
    steps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index);
        setTimeout(() => {
          setCompletedSteps((prev) => [...prev, index]);
        }, 1500);
      }, step.delay);
    });

    // Navigate to course page after completion
    setTimeout(() => {
      navigate("/course/1", { state: { topic } });
    }, 8500);
  }, [navigate, topic]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-purple-50">
      {/* Header */}
      <nav className="px-6 py-4 border-b border-border/40 backdrop-blur-sm bg-white/80">
        <div className="max-w-6xl mx-auto flex items-center">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-brand-500 to-purple-600 rounded-xl">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">
              CourseAI
            </span>
          </div>
        </div>
      </nav>

      {/* Loading Content */}
      <main className="px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Main Animation */}
          <div className="mb-12">
            <div className="relative inline-flex p-8 bg-gradient-to-r from-brand-100 to-purple-100 rounded-3xl mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-purple-600 rounded-3xl animate-pulse opacity-20"></div>
              <Brain className="h-16 w-16 text-brand-600 animate-bounce" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Crafting Your Course
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Building a comprehensive course on:
            </p>
            <p className="text-2xl font-semibold bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">
              "{topic}"
            </p>
          </div>

          {/* Progress Steps */}
          <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <div className="space-y-6">
              {steps.map((step, index) => {
                const isCompleted = completedSteps.includes(index);
                const isCurrent = currentStep === index;
                const isPending = index > currentStep;

                return (
                  <div key={index} className="flex items-center gap-4">
                    <div
                      className={`
                      flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500
                      ${
                        isCompleted
                          ? "bg-gradient-to-r from-green-500 to-emerald-500"
                          : isCurrent
                            ? "bg-gradient-to-r from-brand-500 to-purple-600 animate-pulse"
                            : "bg-gray-200"
                      }
                    `}
                    >
                      {isCompleted ? (
                        <Check className="h-6 w-6 text-white" />
                      ) : (
                        <step.icon
                          className={`h-6 w-6 ${isCurrent ? "text-white" : "text-gray-400"}`}
                        />
                      )}
                    </div>

                    <div className="flex-1 text-left">
                      <p
                        className={`
                        text-lg font-medium transition-colors duration-300
                        ${
                          isCompleted
                            ? "text-green-600"
                            : isCurrent
                              ? "text-brand-600"
                              : "text-gray-400"
                        }
                      `}
                      >
                        {step.text}
                      </p>
                      {isCurrent && (
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                          <div className="bg-gradient-to-r from-brand-500 to-purple-600 h-1 rounded-full animate-pulse w-3/4"></div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-sm text-gray-500">
              This may take a few seconds...
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
