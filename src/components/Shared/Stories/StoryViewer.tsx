import { useState, useEffect } from "react";
import { useViewStory, useDeleteStory } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";
import { useFullscreen } from "@/context/FullscreenContext.tsx";
import { convertImageUrl } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import StoryViewersModal from "./StoryViewersModal.tsx";
import type { Models } from "appwrite";

interface StoryViewerProps {
  stories: Models.Document[];
  initialIndex: number;
  onClose: () => void;
}

const StoryViewer = ({ stories, initialIndex, onClose }: StoryViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [showViewersModal, setShowViewersModal] = useState(false);
  const { user } = useUserContext();
  const { setIsFullscreen } = useFullscreen();
  const { mutate: viewStory } = useViewStory();
  const { mutate: deleteStory } = useDeleteStory();

  const currentStory = stories[currentIndex];
  const isOwnStory = currentStory?.users.$id === user.id;

  // Auto-progress timer
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 1;
      });
    }, 50); // 5 seconds total (100 * 50ms)

    return () => clearInterval(timer);
  }, [currentIndex]);

  // Enable fullscreen mode when component mounts
  useEffect(() => {
    setIsFullscreen(true);
    
    // Add keyboard support
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    
    // Cleanup: disable fullscreen when component unmounts
    return () => {
      setIsFullscreen(false);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [setIsFullscreen]);

  // Mark story as viewed
  useEffect(() => {
    if (currentStory && !isOwnStory) {
      viewStory({ storyId: currentStory.$id, userId: user.id });
    }
  }, [currentStory, user.id, isOwnStory]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      setIsFullscreen(false);
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    }
  };

  const handleClose = () => {
    setIsFullscreen(false);
    onClose();
  };

  const handleDelete = () => {
    if (currentStory && isOwnStory) {
      deleteStory({ 
        storyId: currentStory.$id, 
        imageId: currentStory.imageId 
      });
      
      if (stories.length === 1) {
        setIsFullscreen(false);
        onClose();
      } else {
        handleNext();
      }
    }
  };

  if (!currentStory) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Progress bars */}
      <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
        {stories.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-gray-600 rounded">
            <div
              className="h-full bg-white rounded transition-all duration-100"
              style={{
                width: index < currentIndex ? '100%' : 
                       index === currentIndex ? `${progress}%` : '0%'
              }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <img
            src={currentStory.users.imageUrl ? convertImageUrl(currentStory.users.imageUrl) : "/Icons/User.svg"}
            alt={currentStory.users.name}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => { e.currentTarget.src = "/Icons/User.svg"; }}
          />
          <div>
            <p className="text-white font-semibold">{currentStory.users.name}</p>
            <p className="text-gray-300 text-sm">
              {formatDistanceToNow(new Date(currentStory.$createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isOwnStory && (
            <button
              onClick={handleDelete}
              className="text-white hover:text-red-400 p-2"
              title="Delete story"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
          
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-300 p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation areas */}
      <div className="absolute inset-0 flex">
        <div 
          className="flex-1 cursor-pointer"
          onClick={handlePrevious}
        />
        <div 
          className="flex-1 cursor-pointer"
          onClick={handleNext}
        />
      </div>

      {/* Story content */}
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          src={convertImageUrl(currentStory.imageUrl)}
          alt="Story"
          className="max-w-full max-h-full object-contain"
        />
        
        {/* Caption */}
        {currentStory.caption && (
          <div className="absolute bottom-20 left-4 right-4">
            <p className="text-white text-center bg-black bg-opacity-50 p-3 rounded-lg">
              {currentStory.caption}
            </p>
          </div>
        )}
      </div>

      {/* Story Analytics for own stories */}
      {isOwnStory && (
        <div className="absolute bottom-4 left-4">
          <button
            onClick={() => setShowViewersModal(true)}
            className="flex items-center gap-2 text-white bg-black bg-opacity-50 px-3 py-2 rounded-full hover:bg-opacity-70 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="text-sm">
              {currentStory.viewers?.length || 0} {(currentStory.viewers?.length || 0) === 1 ? 'view' : 'views'}
            </span>
          </button>
        </div>
      )}

      {/* Story Viewers Modal */}
      {showViewersModal && isOwnStory && (
        <StoryViewersModal
          viewerIds={currentStory.viewers || []}
          onClose={() => setShowViewersModal(false)}
        />
      )}
    </div>
  );
};

export default StoryViewer;