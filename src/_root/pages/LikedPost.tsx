import GridPostList from "@/components/Shared/GridPostList";
import { useGetCurrentUser, useGetUserById } from "@/lib/react-query/queriesAndMutation";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";

const LikedPosts = () => {
  const { id } = useParams();
  const { data: currentUser } = useGetCurrentUser();
  const { data: profileUser, isLoading } = useGetUserById(id || "");

  if (isLoading || !profileUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <>
      {(!profileUser.liked || profileUser.liked.length === 0) && (
        <p className="text-light-4">No liked posts</p>
      )}

      <GridPostList posts={profileUser.liked || []} showStats={false} />
    </>
  );
};

export default LikedPosts;
