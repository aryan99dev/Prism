import Loader from "@/components/Shared/Loader";
import PostCard from "@/components/Shared/PostCard";
import ScrambledText from "@/components/Shared/TextAnimations/ScrambledText/ScrambledText"
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutation";
import type { Models } from "appwrite";

const Home = () => {
    const { data: posts, isPending: isPostLoading, isError: isErrorPosts } = useGetRecentPosts();


    return (
        <div className="flex flex-1 ">
            <div className="home-container">
                <div className="home-posts">
                 <ScrambledText
                   className="h3-bold md:h2-bold text-left w-full  
               w    hover:drop-shadow-[0px_0px_8px_rgba(255,255,255,0.4)] transition 
                   duration-300 ease-in-out  "
                   radius={30}
                   duration={1.2}
                   speed={0.5}
                   scrambleChars={'.:'}
                 >
                    HomePage
                 </ScrambledText>
                 {isPostLoading && !posts ? (
                    <div
                    className="flex flex-col items-center"
                    >
                     <Loader />
                    </div>
                 ) : <ul className="flex flex-col flex-1 gap-9 w-full">
                    {posts?.documents.map((post: Models.Document) => (
                        <PostCard key={post.caption} post={post}/>
                    ))}
                 </ul>
                 }
                </div>
            </div>
        </div>
    )
}
export default Home
