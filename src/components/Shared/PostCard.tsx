import type { Models } from "appwrite"
import { Link } from "react-router-dom"
import { formatDistanceToNow } from "date-fns";
import { Bolt } from "./Bolt";
import { useUserContext } from "@/context/AuthContext";
import { Loader } from "lucide-react";

type PostCardProps = {
    post: Models.Document
 }

const PostCard = ({ post }: PostCardProps) => {
const { user } = useUserContext();
console.log(post);


if(!post.creator) return;

  return (
    <div className="post-card">
        <div className="flex w-full items-center">
            <div className="flex items-center gap-3">
                <Link 
                    to={`${post.creator.$id}`}
                >
                    <img 
                        src={post?.creator?.imageUrl?.trim() ? post.creator.imageUrl : "/Icons/User.svg"}
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
                    className="w-5 h-5"
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
                ? post.imageUrl.replace("/preview", "/view").split("?")[0] + `?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`
                : "/Icons/loader.svg"
            }
            onError={e => { e.currentTarget.src = "/Icons/loader.svg"; }}
            className="rounded-2xl max-w-full max-h-96  border border-[0.5px] border-light-3/20 "
            alt="Post image"
            />
        </Link>
    </div>
  )
}

export default PostCard;