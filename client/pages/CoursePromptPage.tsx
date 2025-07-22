import { useState } from 'react';

export default function CoursePromptPage() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const response = await fetch("/api/generate-course", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ prompt : 'your course topic' }),
});

    const data = await response.json();
    
    localStorage.setItem('courseData', JSON.stringify(data));
    window.location.href = '/course-viewer';
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center space-y-4">
      <h1 className="text-3xl font-bold">AI Course Builder</h1>
      <p className="text-gray-500">Enter a topic to generate a full course</p>
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="e.g., Pointers in C++"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Course'}
      </button>
    </div>
  );
}
