import {Outlet} from "react-router-dom";
import BottomBar from "@/components/Shared/BottomBar.tsx";
import LeftSideBar from "@/components/Shared/LeftSideBar.tsx";
import Topbar from "@/components/Shared/Topbar.tsx";
import { useFullscreen } from "@/context/FullscreenContext.tsx";



const RootLayout = () => {
    const { isFullscreen } = useFullscreen();

    return (
        <div className="w-full md:flex">
            {!isFullscreen && <Topbar />}
            {!isFullscreen && <LeftSideBar />}
            
            <div className={`main-wrapper ${isFullscreen ? 'fullscreen-content' : ''}`}>
                
            <section className="flex flex-1 h-full">
                <Outlet />
            </section>
            </div>
            {!isFullscreen && <BottomBar />}
        </div>
    )
}
export default RootLayout
