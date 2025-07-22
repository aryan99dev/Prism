import { Delete } from "@/components/Logos/Delete";
import DotBackground from "@/components/Shared/DotBackground";
import Loader from "@/components/Shared/Loader";
import PostStats from "@/components/Shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/queriesAndMutation"
import { formatDistanceToNow } from "date-fns";
import { Link, useParams } from "react-router-dom"

// Helper to transform Appwrite preview URL to view URL
const getDisplayImageUrl = (url: string | undefined) => {
  if (!url) return "";
  return url.replace("/preview", "/view").split("?")[0] + `?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`;
};

const PostDetails = () => {
  const { id }= useParams();
  const { data: post, isPending } = useGetPostById( id || '' );
  const { user } = useUserContext();

  const handleDeletePost = () => {

  }

  // Guard clause: show loader if loading, or if post/creator is missing
  if (isPending || !post || !post.creator) {
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
          className="flex gap-4  items-center gap-3"
          >
            <img 
              src={post.creator?.imageUrl?.trim() ? post?.creator.imageUrl : "/Icons/User.svg"}
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
              <p className="subtle-semibold lg:smallregular">
                {post?.location}
              </p>
            </div>
          </div>
          </Link>


          <div className="flex-center ">
          <Link to={`/update-post/${post?.$id}`} 
          className={`${user.id !== post?.creator.$id && 'hidden '} flex-center gap-4  mb-6 `}
          >
            <img
              src="/public/Icons/edit-05.svg"
              alt="edit"
              width={24}
              height={24}
            />
          </Link>
          <Button
          onClick={handleDeletePost}
          variant="ghost"
          className={`ghost_details-delete_btn ${user.id !== post?.creator.$id && 'hidden'} mb-6`}
          >
            <Delete 
            className="size-6"
            />
          </Button>
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