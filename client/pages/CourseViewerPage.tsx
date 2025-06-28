import { useEffect, useState } from 'react';
import CourseCard from '../components/ui/CourseCard';


type CourseContent = {
  title: string;
  modules: {
    title: string;
    videos: { title: string; url: string }[];
    docs: { title: string; url: string }[];
  }[];
};

export default function CourseViewerPage() {
  const [course, setCourse] = useState<CourseContent | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('courseData');
    if (data) setCourse(JSON.parse(data));
  }, []);

  if (!course) return <p className="text-center mt-20">Loading course...</p>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">{course.title}</h2>
      {course.modules.map((mod, idx) => (
        <div key={idx} className="bg-gray-100 p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">{mod.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mod.videos.map((vid, i) => (
              <CourseCard
  key={i}
  type="video"
  title={vid.title}
  url={vid.url}
/>

            ))}
            {mod.docs.map((doc, j) => (
              <a key={j} href={doc.url} className="block p-2 bg-white shadow rounded hover:underline">
                📄 {doc.title}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
