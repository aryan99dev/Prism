import PostForms from "@/components/Forms/PostForms"
import { Blend } from "@/components/Logos/Blend"
import RippleGrid from "@/components/Shared/Backgrounds/RippleGrid/RippleGrid"

const CreatePost = () => {
  return (
    <div className='relative flex flex-1 w-full h-screen'>
      {/* Background layer */}
      <div className='fixed inset-0 w-full h-full'>
        <RippleGrid
          enableRainbow={false}
          gridColor="#a855f7"
          rippleIntensity={0.05}
          gridSize={25}
          gridThickness={25}
          mouseInteraction={true}
          mouseInteractionRadius={20}
          opacity={0.5}
        />
      </div>

      {/* Content layer */}
      <div className='relative z-10 w-full md:ml-[270px]'>
        <div className='common-container'>
          <div className="max-w-5xl flex items-center gap-3 w-full">
            <Blend height={36} widths={36} />
            <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
          </div>
          <PostForms />
        </div>
      </div>
    </div>
  )
}

export default CreatePost