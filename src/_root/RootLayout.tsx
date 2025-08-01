import {Outlet} from "react-router-dom";
import BottomBar from "@/components/Shared/BottomBar.tsx";
import LeftSideBar from "@/components/Shared/LeftSideBar.tsx";
import Topbar from "@/components/Shared/Topbar.tsx";



const RootLayout = () => {
    return (
        <div className="w-full md:flex ">
            <Topbar />
            <LeftSideBar />
            
            <div className="main-wrapper">
                
            <section className="flex flex-1 h-full">
                <Outlet />
            </section>
            </div>
            <BottomBar />
        </div>
    )
}
export default RootLayout
