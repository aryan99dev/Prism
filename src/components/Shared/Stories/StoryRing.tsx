import { useState } from "react";
import { convertImageUrl } from "@/lib/utils";
import StoryViewer from "./StoryViewer.tsx";
import type { Models } from "appwrite";

interface StoryRingProps {
  user: Models.Document;
  stories: Models.Document[];
  hasUnviewed: boolean;
}

const StoryRing = ({ user, stories, hasUnviewed }: StoryRingProps) => {
  const [showViewer, setShowViewer] = useState(false);

  const handleClick = () => {
    setShowViewer(true);
  };

  return (
    <>
      <div
        className="flex flex-col items-center cursor-pointer group min-w-[80px] flex-shrink-0 h-[100px]"
        onClick={handleClick}
      >
        <div
          className={`relative p-1 rounded-full ${
            hasUnviewed
              ? "bg-gradient-to-tr from-[#5f56ed] via-red-500 to-[#211d5a]"
              : "bg-gray-300"
          }`}
        >
          <div className="bg-white p-1 rounded-full">
            <img
              src={
                user.imageUrl
                  ? convertImageUrl(user.imageUrl)
                  : "/Icons/User.svg"
              }
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover group-hover:scale-105 transition-transform"
              onError={(e) => {
                e.currentTarget.src = "/Icons/User.svg";
              }}
            />
          </div>

          {/* Story count indicator */}
          {stories.length > 1 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {stories.length}
            </div>
          )}
        </div>

        <p className="text-xs text-center mt-2 w-full truncate text-white px-1">
          {user.name}
        </p>
      </div>

      {showViewer && (
        <StoryViewer
          stories={stories}
          initialIndex={0}
          onClose={() => setShowViewer(false)}
        />
      )}
    </>
  );
};

export default StoryRing;
