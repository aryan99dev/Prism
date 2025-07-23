import { useUserContext } from "@/context/AuthContext"
import type { Models } from "appwrite"
import { Link } from "react-router-dom"
import PostStats from "./PostStats"
import { convertImageUrl } from "@/lib/utils"

type GridPostsListProps =  {
    posts: Models.Document[],
    showUser?: boolean,
    showStats?: boolean,
    extraGridGap?: boolean,
}

const GridPostList = ({ posts, showUser = true, showStats = true, extraGridGap = false }: GridPostsListProps) => {
    const { user } = useUserContext();
    const isFewPosts = posts.length < 3;

    const content = posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
            <Link
                to={`/posts/${post.$id}`}
                className=" flex grid-post-link rounded-[24px] overflow-hidden  w-full h-full"
            >
                <div className="violet-tint w-full h-full rounded-[24px]">
                    <img
                        src={convertImageUrl(post?.imageUrl)}
                        alt="posts"
                        className="w-full h-full object-cover rounded-[24px]"
                    />
                </div>
            </Link>
            <div className="grid-post_user">
                {showUser && (
                    <div className="flex items-end gap-2 justify-between w-full   md:w-auto">
                        <div className="flex items-center gap-2 ml-0 pl-0">
                            <img
                                src={post.creator.imageUrl ? convertImageUrl(post.creator.imageUrl) : "/Icons/User.svg"}
                                alt="creator"
                                className="h-8 w-8 rounded-full hover:scale-105 duration-300 "
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
    ));

    return isFewPosts ? (
        <ul className="flex flex-wrap justify-center items-center gap-9 gap-y-9 w-full">
            {content}
        </ul>
    ) : (
        <ul className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 gap-y-9 justify-items-center w-full ${extraGridGap ? 'lg:gap-x-[21em]' : ''}`}>
            {content}
        </ul>
    );
}

export default GridPostList
