import { Route, Routes, Link, Outlet, useParams, useLocation } from "react-router-dom";
import { convertImageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import GridPostList from "@/components/Shared/GridPostList";
import { useGetUserById, useFollowUser, useUnfollowUser } from "@/lib/react-query/queriesAndMutation";
import LikedPosts from "./LikedPost";
import { Blend } from "@/components/Logos/Blend";
import Loader from "@/components/Shared/Loader";
import { Like } from "@/components/Logos/Like";
import DotBackground from "@/components/Shared/DotBackground.tsx";

// Stat block for displaying user stats
interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Profile = () => {
  // Hooks and state
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  // Fetch current user data by ID
  const { data: currentUser } = useGetUserById(id || "");
  // Mutation hooks for follow/unfollow
  const { mutate: follow } = useFollowUser();
  const { mutate: unfollow } = useUnfollowUser();

  // Show loader if user data is not loaded
  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  // Check if the current user is following the profile user
  const isFollowing = currentUser.followers?.includes(user.id);

  // Render
  return (
    <div className="profile-container pb-0 md:pb-[800px] lg:pb-[110px]">
      <div className="profile-inner_container">
        <div className="z-[-1]">
          <DotBackground />
        </div>
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          {/* Profile image */}
          <img
            src={
              currentUser.imageUrl ? convertImageUrl(currentUser.imageUrl) : "/Icons/User.svg"
            }
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full border-[3px] border-white hover:scale-[105%] transition-all ease-in-out duration-300"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {currentUser.name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{currentUser.username}
              </p>
            </div>
            {/* User stats */}
            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts.length} label="Posts" />
              <StatBlock value={currentUser.followers?.length || 0} label="Followers" />
              <StatBlock value={currentUser.following?.length || 0} label="Following" />
            </div>
            {/* User bio */}
            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {currentUser.bio}
            </p>
          </div>
          {/* Edit/Follow buttons */}
          <div className="flex justify-center gap-4 rounded-3xl">
            {/* Show edit button if viewing own profile */}
            <div className={`${user.id !== currentUser.$id && "hidden"}`}>
              <Link
                to={`/update-profile/${currentUser.$id}`}
                className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-full ${user.id !== currentUser.$id && "hidden"}`}>
                <img
                  src={"/Icons/edit-05.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
            </div>
            {/* Show follow/unfollow button if viewing another user's profile */}
            <div className={`${user.id === id && "hidden"}`}>
              <Button
                type="button"
                className="shad-button_primary px-8"
                onClick={() => {
                  if (isFollowing) {
                    unfollow({ currentUserId: user.id, targetUserId: currentUser.$id });
                  } else {
                    follow({ currentUserId: user.id, targetUserId: currentUser.$id });
                  }
                }}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Profile navigation tabs */}
      <div className="flex max-w-5xl w-full">
        <Link
          to={`/profile/${id}`}
          className={`profile-tab rounded-s-full ${pathname === `/profile/${id}` && "!bg-dark-3"}`}>
          <Blend />
          Posts
        </Link>
        <Link
          to={`/profile/${id}/liked-posts`}
          className={`profile-tab rounded-e-full ${pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"}`}>
          <Like />
          Liked Posts
        </Link>
      </div>
      {/* Profile routes */}
      <Routes>
        <Route
          index
          element={<GridPostList posts={currentUser.posts} showUser={false} />}
        />
        <Route path="/liked-posts" element={<LikedPosts />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
