import DotBackground from "@/components/Shared/DotBackground";
import Loader from "@/components/Shared/Loader";
import PostCard from "@/components/Shared/PostCard";
import ScrambledText from "@/components/Shared/TextAnimations/ScrambledText/ScrambledText"
import StoriesContainer from "@/components/Shared/Stories/StoriesContainer";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutation";
import type { Models } from "appwrite";

const Home = () => {
    const { data: posts, isPending: isPostLoading } = useGetRecentPosts();


    return (
        <div className="flex flex-1" style={{ position: "relative" }}>
            <DotBackground />
            <div className="home-container" style={{ position: "relative", zIndex: 1 }}>
                {/* Stories Section */}
                <StoriesContainer />
                
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
