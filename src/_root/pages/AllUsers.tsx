  import { useToast } from "@/hooks/use-toast";
  import Loader from "@/components/Shared/Loader";
  import UserCard from "@/components/Shared/UserCard";
  import { useGetUsers } from "@/lib/react-query/queriesAndMutation";
import DotBackground from "@/components/Shared/DotBackground";
import ScrambledText from "@/components/Shared/TextAnimations/ScrambledText/ScrambledText";


const AllUsers = () => {
  const { toast } = useToast();

  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });
    
    return;
  }

  return (
    <div className="common-container">
      <div className="fixed inset-0 w-full h-full">
        <DotBackground />
      </div>
      <div className="user-container">
           <ScrambledText
              className="h2-bold text-left ml-1 z-[-1]"
              radius={30}
              duration={1.2}
              speed={0.5}
              scrambleChars={'.:'}
            > 
              Saved Posts
            </ScrambledText>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;