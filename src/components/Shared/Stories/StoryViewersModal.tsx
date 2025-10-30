import React from "react";
import { convertImageUrl } from "@/lib/utils";
import { useGetUsers } from "@/lib/react-query/queriesAndMutation";
import Loader from "../Loader";
import type { Models } from "appwrite";

interface StoryViewersModalProps {
  viewerIds: string[];
  onClose: () => void;
}

const StoryViewersModal = ({ viewerIds, onClose }: StoryViewersModalProps) => {
  const { data: allUsers, isLoading } = useGetUsers();

  // Filter users who viewed the story
  const viewers =
    allUsers?.documents.filter((user: Models.Document) =>
      viewerIds.includes(user.$id)
    ) || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-dark-2/50 backdrop-blur-md rounded-2xl w-full max-w-md mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-dark-4">
          <h2 className="text-lg font-semibold text-white">Story Viewers</h2>
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
        <div className="p-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader />
            </div>
          ) : viewers.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <p className="text-gray-400">No one has viewed this story yet</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {viewers.map((viewer: Models.Document) => (
                <div
                  key={viewer.$id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-dark-3 transition-colors"
                >
                  <img
                    src={
                      viewer.imageUrl
                        ? convertImageUrl(viewer.imageUrl)
                        : "/Icons/User.svg"
                    }
                    alt={viewer.name}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/Icons/User.svg";
                    }}
                  />
                  <div className="flex-1">
                    <p className="text-white font-medium">{viewer.name}</p>
                    <p className="text-gray-400 text-sm">@{viewer.username}</p>
                  </div>
                  <div className="text-xs text-gray-500">
                    <svg
                      className="w-4 h-4"
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
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with viewer count */}
        {viewers.length > 0 && (
          <div className="px-4 py-3 border-t border-dark-4 bg-dark-3">
            <p className="text-center text-sm text-gray-400">
              {viewers.length} {viewers.length === 1 ? "person" : "people"}{" "}
              viewed this story
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryViewersModal;
