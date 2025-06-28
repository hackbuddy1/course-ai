import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, BookOpen, Video, FileText } from "lucide-react";

export default function Index() {
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();

  const suggestions = [
    "Learn React.js from scratch",
    "Pointers in C++",
    "Git & GitHub Basics",
    "Machine Learning fundamentals",
    "Web Development with Node.js",
    "Data Structures and Algorithms",
  ];

  const features = [
    {
      icon: Video,
      title: "Curated Videos",
      description: "High-quality video content from top educators",
    },
    {
      icon: FileText,
      title: "Expert Documents",
      description: "Comprehensive guides and documentation",
    },
    {
      icon: BookOpen,
      title: "Structured Learning",
      description: "Organized modules for progressive learning",
    },
  ];

  const handleGenerateCourse = () => {
    if (topic.trim()) {
      navigate("/loading", { state: { topic } });
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setTopic(suggestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-purple-50">
      {/* Header */}
      <nav className="px-6 py-4 border-b border-border/40 backdrop-blur-sm bg-white/80">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-brand-500 to-purple-600 rounded-xl">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">
              CourseAI
            </span>
          </div>
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-brand-100 to-purple-100 text-brand-700 border-0"
          >
            <Sparkles className="h-3 w-3 mr-1" />
            Beta
          </Badge>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Build AI-Powered
              <span className="block bg-gradient-to-r from-brand-500 to-purple-600 bg-clip-text text-transparent">
                Learning Courses
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Enter any topic and watch as AI curates the perfect learning path
              with videos, documents, and structured modules tailored just for
              you.
            </p>
          </div>

          {/* Main Input */}
          <div className="mb-12">
            <Card className="p-8 max-w-2xl mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <div className="space-y-6">
                <div className="relative">
                  <Input
                    placeholder="Enter a topic to build your course..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="h-14 text-lg px-6 border-2 border-border/50 focus:border-brand-500 rounded-xl"
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleGenerateCourse()
                    }
                  />
                </div>
                <Button
                  onClick={handleGenerateCourse}
                  disabled={!topic.trim()}
                  size="lg"
                  className="w-full h-14 text-lg bg-gradient-to-r from-brand-500 to-purple-600 hover:from-brand-600 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Brain className="h-5 w-5 mr-2" />
                  Generate Course
                </Button>
              </div>
            </Card>
          </div>

          {/* Suggestions */}
          <div className="mb-16">
            <p className="text-sm text-gray-500 mb-4">
              Try these popular topics:
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="rounded-full border-border/50 hover:border-brand-500 hover:bg-brand-50 transition-colors"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-center">
                  <div className="inline-flex p-3 bg-gradient-to-r from-brand-100 to-purple-100 rounded-xl mb-4">
                    <feature.icon className="h-6 w-6 text-brand-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
