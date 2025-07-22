import { Filter } from "@/components/Logos/Filter"
import DotBackground from "@/components/Shared/DotBackground"
import GridPostList from "@/components/Shared/GridPostList"
import Loader from "@/components/Shared/Loader"
import SearchResults from "@/components/Shared/SearchResults"
import ScrambledText from "@/components/Shared/TextAnimations/ScrambledText/ScrambledText"
import { Input } from "@/components/ui/input"
import useDebounce from "@/hooks/useDebounces"
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queriesAndMutation"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

const Explore = () => {

  const { ref, inView } = useInView();

  const { data:posts , fetchNextPage, hasNextPage } = useGetPosts();
  const [searchValue, setSearchValue] = useState('');


  const debouncedValue = useDebounce(searchValue, 500);
  const { data: searchedPost , isFetching: isSearchedFeatching } = useSearchPosts(debouncedValue);

// console.log(posts)

useEffect(() => {
    if(inView && !searchValue ) fetchNextPage();
    
}, [inView,searchValue])


if(!posts){
  return(
    <div className="flex-center w-full h-full">
      <Loader />
    </div>
  )
}


  const ShouldShowSearchResults = searchValue !== '';
  const ShouldShowPosts = !ShouldShowSearchResults && posts?.pages.every((item) => item.documents.length === 0)



  return (
    
    <div className="flex flex-1" style={{ position: "relative" }}>
    <DotBackground />
    <div className="home-container" style={{ position: "relative", zIndex: 1 }}>
      <div className="">
        <ScrambledText
          className=" h2-bold text-left w-full  
          hover:drop-shadow-[0px_0px_8px_rgba(255,255,255,0.4)] transition 
          duration-300 ease-in-out size-8  "
          radius={30}
          duration={1.2}
          speed={0.5}
          scrambleChars={'.:'}
        > 
          Search Post
        </ScrambledText>
        <div className="flex gap-1 px-5 w-[370px] lg:w-[500px] rounded-2xl bg-dark-4/50 backdrop-blur-[3px]
         transition-transform duration-300  lg:hover:scale-105  ease-in-out ">
          <img 
          src="Icons/Search.svg"
          width={24}
          height={24}
          alt="Search"
          />
          <Input 
          type="text"
          placeholder="search"
          className="explore-search "
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
    <div className="explore-container">
      </div>
    </div>
    <div className="flex-between w-full max-w-8xl mt-15 mb-7
    ">
    <ScrambledText
          className="body-bold md:h3-bold
          hover:drop-shadow-[0px_0px_8px_rgba(255,255,255,0.4)] transition 
          duration-300 ease-in-out  "
          radius={30}
          duration={1.2}
          speed={0.5}
          scrambleChars={'.:'}
        > 
          Popular Today
        </ScrambledText>
        <div className="flex-center gap-1 bg-dark-4/50 rounded-2xl px-4 py-1 backdrop-blur-[3px]
        cursor-pointer">
          <p className="small-medium md:base-medium size-4.5">
            All
          </p>
          <Filter className="size-6 "/>
        </div>
    </div>
    <div className="flex flex-wrap gap-9 w-[370px] lg:w-[500px]">
      {ShouldShowSearchResults ? (
        <SearchResults 
        isSearchFetching={isSearchedFeatching}
        searchedPosts={searchedPost }
        />
      ) : ShouldShowPosts ? (
        <p
        className="text-white/50 mt-10 text-center w-full"
        >End of Post</p>
      ) : posts.pages.map((item, index) => (
        <GridPostList key={`page-${index}`} posts={item.documents} />
      ))}
    </div>
    </div>
    {hasNextPage && !searchValue && (
    <div ref={ref} className=" mt-10 ">
      <Loader />
    </div>
    )}
  
    </div>
  )
}

export default Explore