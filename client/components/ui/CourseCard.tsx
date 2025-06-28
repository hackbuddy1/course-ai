import React from 'react';

type CourseCardProps = {
  type: 'video' | 'doc';
  title: string;
  url: string;
};

const CourseCard: React.FC<CourseCardProps> = ({ type, title, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-lg shadow-md bg-white hover:bg-gray-50 transition"
    >
      <div className="text-lg font-medium mb-1">
        {type === 'video' ? '📺' : '📄'} {title}
      </div>
      <div className="text-blue-600 text-sm underline">Open Resource</div>
    </a>
  );
};

export default CourseCard;
