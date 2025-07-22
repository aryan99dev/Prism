import PostForms from "@/components/Forms/PostForms"
import { Blend } from "@/components/Logos/Blend"
import DotBackground from "@/components/Shared/DotBackground"
import ScrambledText from "@/components/Shared/TextAnimations/ScrambledText/ScrambledText"

const CreatePost = () => {
  return (
    <div className='relative flex flex-1 w-full h-screen'>
      {/* Background layer */}
      <div className='fixed inset-0 w-full h-full'>
        <DotBackground />

      </div>

      {/* Content layer */}
      <div className='relative z-10 w-full md:ml-[270px]'>
        <div className='common-container'>
          <div className="max-w-5xl flex items-center gap-3 w-full ">
            <Blend height={36} widths={36}  />
            <ScrambledText
                   className="ml-1 h3-bold md:h2-bold text-left w-full  
               w    hover:drop-shadow-[0px_0px_8px_rgba(255,255,255,0.4)] transition 
                   duration-300 ease-in-out  "
                   radius={30}
                   duration={1.2}
                   speed={0.5}
                   scrambleChars={'.:'}
                 >
                    Create your Post
                 </ScrambledText>
          </div>
          <PostForms action="Create" />
        </div>
      </div>
    </div>
  )
}

export default CreatePost