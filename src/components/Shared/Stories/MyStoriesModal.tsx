import React, { useState } from "react";
import { useGetUserStories } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";
import { convertImageUrl } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import StoryViewersModal from "./StoryViewersModal.tsx";
import Loader from "../Loader";
import type { Models } from "appwrite";

interface MyStoriesModalProps {
  onClose: () => void;
}

const MyStoriesModal = ({ onClose }: MyStoriesModalProps) => {
  const { user } = useUserContext();
  const { data: userStories, isLoading } = useGetUserStories(user.id);
  const [selectedStoryViewers, setSelectedStoryViewers] = useState<
    string[] | null
  >(null);

  const handleViewersClick = (viewerIds: string[]) => {
    setSelectedStoryViewers(viewerIds);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-75">
        <div className="bg-dark-2/50 backdrop-blur-md rounded-3xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-dark-4">
            <h2 className="text-lg font-semibold text-white">My Stories</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-4  rounded-3xl">
            {isLoading ? (
              <div className="flex justify-center py-8 rounded-3xl">
                <Loader />
              </div>
            ) : !userStories?.documents ||
              userStories.documents.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2  rounded-3xl">
                  <svg
                    className="w-12 h-12 mx-auto mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <p className="text-gray-400">
                  You haven't posted any stories yet
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto  rounded-3xl">
                {userStories.documents.map((story: Models.Document) => (
                  <div key={story.$id} className="relative group rounded-3xl">
                    <div className="aspect-[9/16] rounded-3xl overflow-hidden bg-dark-3">
                      <img
                        src={convertImageUrl(story.imageUrl)}
                        alt="Story"
                        className="w-full h-full object-cover"
                      />

                      {/* Overlay with analytics */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200">
                        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() =>
                              handleViewersClick(story.viewers || [])
                            }
                            className="w-full flex items-center justify-between text-white bg-black bg-opacity-70 px-2 py-1 rounded-3xl text-xs"
                          >
                            <span className="flex items-center gap-1">
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              {story.viewers?.length || 0}
                            </span>
                            <span>
                              {formatDistanceToNow(new Date(story.$createdAt), {
                                addSuffix: true,
                              })}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Caption preview */}
                    {story.caption && (
                      <p className="text-xs text-gray-400 mt-1 truncate">
                        {story.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with total stats */}
          {userStories?.documents && userStories.documents.length > 0 && (
            <div className="px-4 py-3 border-t border-dark-4 bg-dark-3 rounded-b-3xl">
              <div className="flex justify-between text-sm text-gray-400">
                <span>{userStories.documents.length} stories posted</span>
                <span>
                  {userStories.documents.reduce(
                    (total: number, story: Models.Document) =>
                      total + (story.viewers?.length || 0),
                    0
                  )}{" "}
                  total views
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Story Viewers Modal */}
      {selectedStoryViewers && (
        <StoryViewersModal
          viewerIds={selectedStoryViewers}
          onClose={() => setSelectedStoryViewers(null)}
        />
      )}
    </>
  );
};

export default MyStoriesModal;
