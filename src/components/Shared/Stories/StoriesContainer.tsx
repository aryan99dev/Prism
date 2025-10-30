import React from "react";
import { useGetActiveStories } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";
import StoryRing from "./StoryRing.tsx";
import CreateStoryRing from "./CreateStoryRing.tsx";
import Loader from "../Loader";
import type { Models } from "appwrite";

const StoriesContainer = () => {
  const { data: stories, isLoading } = useGetActiveStories();
  const { user } = useUserContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-24">
        <Loader />
      </div>
    );
  }

  // Group stories by user
  const groupedStories =
    stories?.documents.reduce((acc: any, story: Models.Document) => {
      const userId = story.users.$id;
      if (!acc[userId]) {
        acc[userId] = {
          user: story.users,
          stories: [],
          hasUnviewed: false,
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
    <div className="stories-container">
      <div className="stories-scroll">
        {/* Create Story Ring - Always first */}
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
    </div>
  );
};

export default StoriesContainer;
