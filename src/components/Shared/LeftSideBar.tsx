import {Link, NavLink, useNavigate, useLocation} from "react-router-dom";
import TextPressure from "./TextPressure/TextPressure";
import { useUserContext } from "@/context/AuthContext";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { sidebarLinks } from "@/constants";
import type { INavLink } from "@/types";
import ClickSpark from "./Animations/ClickSpark/ClickSpark";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutation";


const LeftSideBar = () => {
    const { pathname } = useLocation();


    const { mutate: SignOut,
         isSuccess } = useSignOutAccount();
        const navigate = useNavigate();
    
        useEffect(() => {
            if(isSuccess){
                navigate(0);
            }
        }, [isSuccess]);
    
        const { user } = useUserContext();

        const containerRef = useRef(null);

        
    // Add debug logging
    console.log("User object:", user);

    if (!user) {
        return <div className="leftsidebar">Loading...</div>;
    }



    return (  
     <nav className="leftsidebar">

        <ClickSpark>
         <div className="flex flex-col gap-11 ">
             <Link to="/" className=" flex gap-3 items-center justify-center"
             >
                 <img
                     src="/assets/logoTransParent.png"
                     alt="logo"
                     width={100}
                     height={325}
                     className="transition-all duration-300 scale-[70%]  hover:scale-[90%]
                         hover:rotate-[360deg] ease-in-out"
                 /> 
                <div style={{ height: '100px'}}>
                    <br/>
                            <TextPressure
                            text="Prism"
                            flex={true}
                            alpha={false}
                            width={true}
                            weight={true}
                            textColor="#ffffff"
                            strokeColor="#ff0000"
                            minFontSize={50}
                            className="flex justify-center text-center" 
                            />
                </div>
             </Link>
             {/* ProfilePicture */}
             <Link to={`/profile/${user?.id}`}
             className="flex gap-3 items-center"
             >
             <img 
                src={user?.imageUrl || "/Icons/User.svg"}
                alt="profile"
                className="w-14 h-14 border-2  border-white rounded-full hover:opacity-90 
                hover:scale-[105%] transition-all duration-300 ease-in-out"
             /> 
             <div className="flex flex-col">
                <p className="body-bold text-white">
                    {user.name}
                </p>
                <p className="small-regular text-light-3 ">
                    @{user.username}
                </p>
             </div>
             </Link>

             {/* pages links */}
             
             <ul className="flex flex-col gap-6">
                {sidebarLinks.map((link: INavLink) => {
                    const isActive = pathname === link.route
                    const IconComponent = link.icon;
                    return(
                        <li key={link.label} className=
                        {`leftsidebar-link ${
                            isActive && 'bg-primary-600'
                            }`
                        }
                        >
                        <NavLink
                        to={link.route}
                        className="flex gap-4 items-center p-2 "
                        >
                            <div className="flex scale-75">
                         {IconComponent && <IconComponent 
                            className={`group-hover:invert-violet
                                ${isActive && 'invert-white'}`} 
                         />}
                            </div>
                         {link.label}
                        </NavLink>
                        </li>
                    )
                })}
             </ul>
             {/* LogOut */}
             <div className="flex flex-col gap-4 items-center justify-center m-auto py-60">
                 <Button variant="ghost" className="shad-button_ghost w-full " onClick={() => SignOut()}>
                    <img src="/Icons/logout.svg" 
                    />
                    <p className="small-medium lg:base-medium  ">Logout</p>
                    </Button>
             </div>
         </div>
         </ClickSpark>
     </nav>
    )
}
export default LeftSideBar
