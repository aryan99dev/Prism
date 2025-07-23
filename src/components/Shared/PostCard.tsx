import type { Models } from "appwrite"
import { Link } from "react-router-dom"
import { formatDistanceToNow } from "date-fns";
import { Bolt } from "./Bolt";
import { useUserContext } from "@/context/AuthContext";
import PostStats from "./PostStats";
import { convertImageUrl } from "@/lib/utils";

type PostCardProps = {
    post: Models.Document
 }

const PostCard = ({ post }: PostCardProps) => {
const { user } = useUserContext();



if(!post.creator) return;

  return (
    <div className="post-card hover:scale-[101%] duration-700 ease-in-out backdrop-blur-[1.7px]">
        <div className="flex w-full items-center">
            <div className="flex items-center gap-3">
                <Link 
                    to={`${post.creator.$id}`}
                >
                    <img 
                        src={post?.creator?.imageUrl?.trim() ? convertImageUrl(post.creator.imageUrl) : "/Icons/User.svg"}
                        alt="creator profile picture"
                        onError={(e) => { e.currentTarget.src = "/Icons/User.svg"; }}
                        className="rounded-full w-12 lg:h-12"
                    />
                </Link>
                <div className="flex flex-col ">
                    <p className="base-medium lg:body-bold text-light-1 ">{post.creator.name}</p>
                    <div className="flex flex-col  text-light-2/30">
                        <p className="subtle-semibold  lg:small-regular ">
                            Posted on - {formatDistanceToNow(new Date(post.$createdAt), { addSuffix: true })}
                        </p>
                        <p className="subtle-semibold lg:smallregular">
                            {post.location}
                        </p>
                    </div>
                </div>
            </div>
            <Link 
                to={`/update-post/${post.$id}`}
                className={`${user.id !== post.creator.$id && "hidden"} ml-auto ` }
            >
                <Bolt 
                    className="w-5 h-5 drop-shadow-[0_0_4px_rgba(0,0,0,0.7)]"
                    stroke="#FFD700"
                />
            </Link>
        </div>
        <Link 
        to={`/posts/${post.$id}`}
        >
            <div className="small-medium lg:base-medium py-5">
                <p>{post.caption}</p>
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
            <img 
            src={
              post.imageUrl
                ? convertImageUrl(post.imageUrl)
                : "/Icons/loader.svg"
            }
            onError={e => { e.currentTarget.src = "/Icons/loader.svg"; }}
            className="rounded-2xl max-w-full max-h-96  border border-[0.5px] border-light-3/20 "
            alt="Post image"
            />
        </Link>

        <PostStats post={post} userId={user.id} />
    </div>
  )
}

export default PostCard;
