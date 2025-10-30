import { useState } from "react";
import { useUserContext } from "@/context/AuthContext";
import { convertImageUrl } from "@/lib/utils";
import CreateStoryModal from "./CreateStoryModal.tsx";
import MyStoriesModal from "./MyStoriesModal.tsx";

const CreateStoryRing = () => {
  const { user } = useUserContext();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMyStoriesModal, setShowMyStoriesModal] = useState(false);

  return (
    <>
      <div 
        className="flex flex-col items-center cursor-pointer group min-w-[80px] flex-shrink-0 h-[100px]"
        onClick={() => setShowCreateModal(true)}
      >
        <div className="relative p-1 rounded-full bg-gray-300">
          <div className="bg-white p-1 rounded-full">
            <img
              src={user.imageUrl ? convertImageUrl(user.imageUrl) : "/Icons/User.svg"}
              alt="Your story"
              className="w-16 h-16 rounded-full object-cover group-hover:scale-105 transition-transform"
              onError={(e) => { e.currentTarget.src = "/Icons/User.svg"; }}
            />
          </div>
          
          {/* Plus icon */}
          <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>
        
        <p className="text-xs text-center mt-2 w-full truncate text-white px-1">
          Your Story
        </p>
        
        {/* My Stories button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMyStoriesModal(true);
          }}
          className="text-xs text-white hover:text-blue-500 mt-1"
        >
          View All
        </button>
      </div>

      {showCreateModal && (
        <CreateStoryModal onClose={() => setShowCreateModal(false)} />
      )}
      
      {showMyStoriesModal && (
        <MyStoriesModal onClose={() => setShowMyStoriesModal(false)} />
      )}
    </>
  );
};

export default CreateStoryRing;