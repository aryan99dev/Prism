import PostForms from "@/components/Forms/PostForms"
import { Blend } from "@/components/Logos/Blend"
import DotGrid from "@/components/Shared/Backgrounds/DotGrid/DotGrid"
import ScrambledText from "@/components/Shared/TextAnimations/ScrambledText/ScrambledText"
import { useParams } from "react-router-dom"

const EditPost = () => {
  const { id } = useParams();

  return (
    <div className='relative flex flex-1 w-full h-screen'>
      {/* Background layer */}
      <div className='fixed inset-0 w-full h-full'>
      <DotGrid
        dotSize={2}
        gap={13}
        baseColor="#271e37"
        activeColor="#5227FF"
        proximity={50}
        shockRadius={250}
        shockStrength={20}
        resistance={1000}
        returnDuration={3}
        
      />

      </div>

      {/* Content layer */}
      <div className='relative z-10 w-full md:ml-[270px]'>
        <div className='common-container'>
          <div className="max-w-5xl flex items-center gap-3 w-full">
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
                    Edit Post
                 </ScrambledText>
          </div>
          <PostForms />
        </div>
      </div>
    </div>
  )
}

export default EditPost