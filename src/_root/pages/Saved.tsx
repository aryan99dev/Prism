import type { Models } from "appwrite";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutation";
import Loader from "@/components/Shared/Loader";
import GridPostList from "@/components/Shared/GridPostList";
import DotBackground from "@/components/Shared/DotBackground";
import ScrambledText from "@/components/Shared/TextAnimations/ScrambledText/ScrambledText";

const Saved = () => {
  // Fetch the current user and their saved posts
  const { data: currentUser } = useGetCurrentUser();

  // Filter and map saved posts to include creator info, then reverse for latest first
  const savePosts = currentUser?.save
    .filter((savePost: Models.Document) => !!savePost.post) // Only keep if post exists
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser.imageUrl,
      },
    }))
    .reverse();

  // Render
  return (
    <div className="flex flex-col min-h-screen relative w-full">
      {/* Dot background */}
      <div className="fixed inset-0 w-full h-full">
        <DotBackground />
      </div>
      {/* Content layer */}
      <div className="relative z-10 w-full md:ml-[150px] flex-1">
        <div className="saved-container">
          <div className="flex items-center gap-1 w-full max-w-5xl mb-6">
            <img
              src="/Icons/edit-05.svg"
              width={36}
              height={36}
              alt="edit"
              className="invert-white"
            />
            <ScrambledText
              className="h2-bold text-left ml-1"
              radius={30}
              duration={1.2}
              speed={0.5}
              scrambleChars={'.:'}
            >
              Saved Posts
            </ScrambledText>
          </div>
          {/* Show loader if user data is not loaded, else show saved posts */}
          {!currentUser ? (
            <Loader />
          ) : (
            <ul className="flex flex-1 items-center justify-center w-full ">
              {savePosts.length === 0 ? (
                <p className="text-light-4">No available posts</p>
              ) : (
                <GridPostList posts={savePosts} showUser={true} showStats={false} />
              )}
            </ul>
          )}
        </div>
      </div>
      {/* Spacer at the bottom for layout */}
      <div className="w-full" style={{ height: "500px" }} />
    </div>
  );
};

export default Saved;