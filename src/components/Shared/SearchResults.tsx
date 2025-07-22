import type { Models } from "appwrite";
import Loader from "./Loader";
import GridPostList from "./GridPostList";

type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[];
}

const SearchResults = ({isSearchFetching, searchedPosts}: SearchResultsProps) => {
  if(isSearchFetching) return <Loader />

  if(searchedPosts && searchedPosts.documents.length > 0) { 
    return ( 
 
    <GridPostList posts={searchedPosts.documents} showUser={true} showStats={false} />
 )
  }


  return (
    <p className="text-white/50 mt-10 text-center w-full">No results found</p>
  )
}

export default SearchResults