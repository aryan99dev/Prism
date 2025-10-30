import React from "react";
import { formatDistanceToNow } from "date-fns";
import type { Models } from "appwrite";

interface StoryAnalyticsProps {
  story: Models.Document;
  onViewersClick: () => void;
}

const StoryAnalytics = ({ story, onViewersClick }: StoryAnalyticsProps) => {
  const viewersCount = story.viewers?.length || 0;
  const timeAgo = formatDistanceToNow(new Date(story.$createdAt), { addSuffix: true });

  return (
    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
      {/* Left side - Viewers */}
      <button
        onClick={onViewersClick}
        className="flex items-center gap-2 text-white bg-black bg-opacity-50 px-3 py-2 rounded-full hover:bg-opacity-70 transition-all"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span className="text-sm">
          {viewersCount} {viewersCount === 1 ? 'view' : 'views'}
        </span>
      </button>

      {/* Right side - Time */}
      <div className="text-white bg-black bg-opacity-50 px-3 py-2 rounded-full">
        <span className="text-xs">
          {timeAgo}
        </span>
      </div>
    </div>
  );
};

export default StoryAnalytics;