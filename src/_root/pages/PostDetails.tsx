import { Delete } from "@/components/Logos/Delete";
import DotBackground from "@/components/Shared/DotBackground";
import Loader from "@/components/Shared/Loader";
import PostStats from "@/components/Shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useDeletePost, useGetPostById, useDeleteSavedPost, useGetCurrentUser } from "@/lib/react-query/queriesAndMutation"
import { formatDistanceToNow } from "date-fns";
import { Link, useParams, useNavigate } from "react-router-dom"
import type { Models } from "appwrite";
import { useQueryClient } from "@tanstack/react-query";

// Helper to transform Appwrite preview URL to view URL
const getDisplayImageUrl = (url: string | undefined) => {
  if (!url) return "";
  return url.replace("/preview", "/view").split("?")[0] + `?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`;
};

const PostDetails = () => {
  const { id }= useParams();
  const { data: post, isPending } = useGetPostById( id || '' );
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();
  const { mutate: deleteSavePost } = useDeleteSavedPost();
  const { data: currentUser } = useGetCurrentUser();
  const queryClient = useQueryClient();

  const handleDeletePost = () => {
    if (!post) return;

    // Only allow the creator to delete the post
    if (user.id !== post.creator.$id) {
      console.log("Only the creator can delete this post");
      return;
    }

    deletePost({ 
      postId: post.$id, 
      imageId: post.imageid
    }, {
      onSuccess: () => {
        // Remove from saved posts if it exists
        if (currentUser?.save) {
          const savedRecord = currentUser.save.find((record: Models.Document) => record.post && record.post.$id === post.$id);
          if (savedRecord) {
            deleteSavePost(savedRecord.$id, {
              onSuccess: () => {
                // Force refetch of current user after saved post is deleted
                queryClient.invalidateQueries(["getCurrentUser"]);
              }
            });
          } else {
            // If not saved, still force refetch after post deletion
            queryClient.invalidateQueries(["getCurrentUser"]);
          }
        } else {
          // If no save array, still force refetch after post deletion
          queryClient.invalidateQueries(["getCurrentUser"]);
        }
        // Navigate after successful deletion
        navigate('/');
      },
      onError: (error) => {
        console.error("Failed to delete post:", error);
        alert("Failed to delete post. Please try again.");
      }
    });
  }

  // Guard clause: show loader if loading, deleting, or if post/creator is missing
  if (isPending || isDeleting || !post || !post.creator) {
    return <Loader />;
  }

  return (
    <div 
      className="post_details-container"
    >
      <div className="z-[-1]">
        <DotBackground />
      </div>
      <div className="post_details-card">
        <img 
          src={getDisplayImageUrl(post?.imageUrl)}
          alt="post"
          className="post_details-img "
        />
        <div className="post_details-info">
          <div className="flex-between w-full mt-3">

          <Link to={`/profile/${post?.creator.$id}`}
          className="flex gap-4  items-center "
          >
            <img 
              src={getDisplayImageUrl(post.creator?.imageUrl) || "/Icons/User.svg"}
              alt="creator profile picture"
              onError={(e) => { e.currentTarget.src = "/Icons/User.svg"; }}
              className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
            />
          <div className="flex flex-col ">
            <p className="base-medium lg:body-bold text-light-1 ">{post?.creator.name}</p>
            <div className="flex flex-col  text-light-2/30">
              <p className="subtle-semibold  lg:small-regular ">
                Posted on - {formatDistanceToNow(new Date(post?.$createdAt), { addSuffix: true })}
              </p>
              <p className="subtle-semibold lg:small-regular">
                {post?.location}
              </p>
            </div>
          </div>
          </Link>


          <div className="flex-center ">
          {user.id === post?.creator.$id && (
            <Link to={`/update-post/${post?.$id}`} 
              className="flex-center gap-4 mb-6"
            >
              <img
                src="/Icons/edit-05.svg"
                alt="edit"
                width={24}
                height={24}
              />
            </Link>
          )}
          {user.id === post?.creator.$id && (
            <Button
              onClick={handleDeletePost}
              variant="ghost"
              className="ghost_details-delete_btn mb-6"
              aria-label="Delete post"
            >
              <Delete 
                className="size-6"
              />
            </Button>
          )}
          </div>
          </div >
          <hr className=" border w-full border-dark-4 mt-2" />

          <div className="flex flex-col flex-1 w-full small-medium lg:base-medium mt-4">
                <p>{post?.caption}</p>
                <ul className="flex gap-1 mt-2"
                >
                    {post.tags.map((tag: string)=> (
                        <li
                        key={tag}
                        className="text-white/30"
                        >
                            #{tag}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-full mb-2  ">
              <PostStats post={ post || {} } userId={ user.id } />
            </div>
        </div>
      </div>
        <div className="w-full h-[100px] lg:h-[110px] md:h-[500px]"></div>
    </div>
  )
}

export default PostDetails
