import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutation";
import { checkIsLiked } from "@/lib/utils";
import type { Models } from "appwrite"
import { useState , useEffect } from "react";
import Loader from "./Loader";

type PostStatsProps = {
    post: Models.Document;
    userId: string;
}
const liked = "/Icons/liked.svg"
const PostStats = ({ post ,userId }: PostStatsProps) => {
    const likesList = post.likes.map((user: Models.Document) => user.$id)

    const [likes, setLikes] = useState(likesList);
    const [isSaved, setIsSaved] = useState(false);


    const { mutate: likePost } = useLikePost();
    const { mutate: savePost , isPending: isSavingPost } = useSavePost();
    const { mutate: deleteSavePost , isPending: isDeletingSaved } = useDeleteSavedPost();

    const { data: currentUser } = useGetCurrentUser();

    const savedPostRecord = currentUser?.save.find((record: Models.Document) => record.post.$id === post.$id)

    useEffect(()=> {
        setIsSaved(!!savedPostRecord);
    }, [currentUser]);

    const handleLikedPost = (e: React.MouseEvent) => {
        e.stopPropagation
        let newLikes = [...likes];

        const hasLiked = newLikes.includes(userId);

        if(hasLiked){
            newLikes = newLikes.filter((id) => id !== userId);
        } else{
            newLikes.push(userId);
        }

        setLikes(newLikes);
        likePost({postId: post.$id, likesArray: newLikes});
    }

    const handleSavedPost = (e: React.MouseEvent) => {
        e.stopPropagation


        if(savedPostRecord) {
            setIsSaved(false);
            deleteSavePost(savedPostRecord.$id);
        }else{
            savePost({postId: post.$id , userId });
            setIsSaved(true);
        }

    }

    
  return (
    <div 
    className="flex justify-between items-center z-20"
    >
        <div
        className="flex gap-2  mt-5 ms-3 "
        >
              <img 
            src={checkIsLiked(likes, userId) ? "/Icons/Liked.svg" : "/Icons/Like.svg"}
            alt="like"
            onClick={handleLikedPost}
            className="flex w-5 h-5 cursor-pointer"
            />
            <p
            className="small-medium lg:base-medium"
            >
                {likes.length}
            </p>
        </div>

        <div
        className="flex gap-2  mt-5 ms-3 "
        >
           { isSavingPost || isDeletingSaved ? <Loader /> 
             : <img 
            src={isSaved ? "/Icons/saved.svg" : "/Icons/save.svg"}
            alt="like"
            onClick={handleSavedPost}
            className="flex w-5 h-5 cursor-pointer"
            /> }
        </div>
    </div>
  )
}

export default PostStats