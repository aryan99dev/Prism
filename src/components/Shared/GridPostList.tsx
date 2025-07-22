import { useUserContext } from "@/context/AuthContext"
import type { Models } from "appwrite"
import { Link } from "react-router-dom"
import PostStats from "./PostStats"

type GridPostsListProps =  {
    posts: Models.Document[],
    showUser?: boolean,
    showStats?: boolean,
}


const GridPostList = ({ posts, showUser = true, showStats = true }: GridPostsListProps) => {
    const { user } = useUserContext();


  return (
    <ul className="grid-container w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
            <li key={post.$id} className="relative min-w-80 h-80">
                <Link
  to={`/posts/${post.$id}`}
  className=" flex grid-post-link rounded-[24px] overflow-hidden  w-full h-full"
>
  <img
    src={post?.imageUrl.replace("/preview", "/view").split("?")[0] + `?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`}
    alt="posts"
    className="w-full h-full object-cover rounded-[24px] hover:scale-110 duration-300 "
  />
</Link>

                <div className="grid-post_user">
                    {showUser && (
                        <div className="flex items-end gap-2 justify-between w-full md:w-auto">
                            <div className="flex items-center gap-2 ">
                                <img
                                    src={post.creator.imageUrl}
                                    alt="creator"
                                    className="h-8 w-8 rounded-full hover:scale-105 duration-300"
                                />
                                <p className="line-clamp-1 text-start text-sm ">{post.creator.name}</p>
                            </div>
                            <div className="mb-1">
                                {showStats && <PostStats post={post} userId={user.id} />}
                            </div>
                        </div>
                    )}
                </div>
            </li>
        ))}
    </ul>
  )
}

export default GridPostList