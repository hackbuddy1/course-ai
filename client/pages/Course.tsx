import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, RefreshCw, ArrowLeft, Brain } from "lucide-react";
import axios from "axios";

interface LocationState {
  topic: string;
}

interface VideoResource {
  title: string;
  url: string;
  author?: string;
}

interface DocumentResource {
  title: string;
  url: string;
  source?: string;
}

interface CourseResponse {
  title: string;
  videos: VideoResource[];
  documents: DocumentResource[];
}

export default function Course() {
  const location = useLocation();
  const navigate = useNavigate();
  const { topic } = (location.state as LocationState) || { topic: "React.js" };

  const [courseData, setCourseData] = useState<CourseResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        
        const BASE_URL = "https://course-ai-9i5f.onrender.com";
        console.log("Hitting API at:", BASE_URL);
        const response = await axios.post<CourseResponse>(`${BASE_URL}/api/generate-course`, {
          prompt: topic,
  });
        setCourseData(response.data);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [topic]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Loading course for <strong className="ml-1">{topic}</strong>...
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-red-500">
        Failed to load course.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-purple-50">
      <nav className="px-6 py-4 border-b border-border/40 backdrop-blur-sm bg-white/80 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-brand-500 to-purple-600 rounded-xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">
                CourseAI
              </span>
            </div>
          </div>
          <Button
            onClick={() => navigate("/loading", { state: { topic } })}
            variant="outline"
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Regenerate Course
          </Button>
        </div>
      </nav>

      <main className="px-6 py-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {courseData.title}
        </h1>

  
        {courseData.videos.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mb-4">📺 Videos</h2>
            <div className="grid gap-4">
              {courseData.videos.map((video, i) => (
                <Card
                  key={i}
                  className="p-4 hover:shadow-md transition-shadow border border-border/50"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {video.author || "YouTube"}
                      </p>
                    </div>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        
        {courseData.documents.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mt-10 mb-4">📄 Documents</h2>
            <div className="grid gap-4">
              {courseData.documents.map((doc, i) => (
                <Card key={i} className="p-4 border border-border/50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {doc.source || "Online"}
                      </p>
                    </div>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
