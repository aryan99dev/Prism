import { useGetActiveStories } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";
import DotBackground from "@/components/Shared/DotBackground";
import Loader from "@/components/Shared/Loader";
import StoryRing from "@/components/Shared/Stories/StoryRing";
import CreateStoryRing from "@/components/Shared/Stories/CreateStoryRing";
import ScrambledText from "@/components/Shared/TextAnimations/ScrambledText/ScrambledText";
import type { Models } from "appwrite";

const Stories = () => {
  const { data: stories, isLoading } = useGetActiveStories();
  const { user } = useUserContext();

  if (isLoading) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  // Group stories by user
  const groupedStories = stories?.documents.reduce((acc: any, story: Models.Document) => {
    const userId = story.users.$id;
    if (!acc[userId]) {
      acc[userId] = {
        user: story.users,
        stories: [],
        hasUnviewed: false
      };
    }
    acc[userId].stories.push(story);
    
    // Check if user has viewed this story
    if (!story.viewers.includes(user.id)) {
      acc[userId].hasUnviewed = true;
    }
    
    return acc;
  }, {}) || {};

  const userStoryGroups = Object.values(groupedStories);

  return (
    <div className="flex flex-1" style={{ position: "relative" }}>
      <DotBackground />
      <div className="home-container" style={{ position: "relative", zIndex: 1 }}>
        <div className="home-posts">
          <ScrambledText
            className="h3-bold md:h2-bold text-left w-full hover:drop-shadow-[0px_0px_8px_rgba(255,255,255,0.4)] transition duration-300 ease-in-out"
            radius={30}
            duration={1.2}
            speed={0.5}
            scrambleChars={'.:'}
          >
            Stories
          </ScrambledText>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-8">
            {/* Create Story Ring */}
            <CreateStoryRing />
            
            {/* User Story Rings */}
            {userStoryGroups.map((group: any) => (
              <StoryRing
                key={group.user.$id}
                user={group.user}
                stories={group.stories}
                hasUnviewed={group.hasUnviewed}
              />
            ))}
          </div>

          {userStoryGroups.length === 0 && (
            <div className="flex-center w-full mt-10">
              <p className="text-light-4">No stories available. Be the first to share one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stories;