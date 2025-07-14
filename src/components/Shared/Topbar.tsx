import {Link, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {useSignOutAccount} from "@/lib/react-query/queriesAndMutation.tsx";
import {useEffect} from "react";
import {useUserContext} from "@/context/AuthContext.tsx";
import TextPressure from "./TextPressure/TextPressure";


const Topbar = () => {
    const { mutate: SignOut, isSuccess } = useSignOutAccount();
    const navigate = useNavigate();

    useEffect(() => {
        if(isSuccess){
            navigate(0);
        }
    }, [isSuccess]);

    const { user } = useUserContext();

    return (
        <section className="topbar ">
            <div className="flex-between py-4 px-5">
                <Link to="/" className=" flex gap-3 items-center">
                    <img
                        src="/assets/logoTransParent.png"
                        alt="logo"
                        width={50}
                        height={325}
                        className=" transition-all duration-300 scale-[70%]  hover:scale-[90%]
                        hover:rotate-[360deg] ease-in-out "
                    />
                    <div style={{ height: '80px'}}>
                    <br/>
                            <TextPressure
                            text="Prism"
                            flex={true}
                            alpha={false}
                            width={true}
                            weight={true}
                            textColor="#ffffff"
                            strokeColor="#ff0000"
                            minFontSize={25}
                            className="flex justify-center text-center font-bold" 
                            />
                </div>
                </Link>
                <div className="flex gap-4 ">

                    <Button variant="ghost" className="shad-button_ghost" onClick={() => SignOut()}>
                        <img src="/Icons/logout.svg" />
                    </Button>
                    <Link to={`/profile/${user.id}`}
                          className="flex-center gap-3 "
                    >
                    <img
                    src={user.imageUrl || "/Icons/User.svg" }
                    alt="profile"
                    className="w-8 h-8 border-2 border-white rounded-full hover:opacity-90"
                    />
                    </Link>
                </div>
            </div>
        </section>
    )
}
export default Topbar
