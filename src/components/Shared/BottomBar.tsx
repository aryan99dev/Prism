import { bottombarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom"

const BottomBar = () => {
    const { pathname } = useLocation();
    return (
        <section className="bottom-bar">
            {bottombarLinks.map((link) => {
                const isActive = pathname === link.route;
                const IconComponent = link.icon;
                return (
                    <Link
                        to={link.route}
                        key={link.label}
                        className={`${
                            isActive && 'bg-primary-600 '
                        }  rounded-[15px] flex flex-col items-center justify-center gap-1 p-2 px-4 transition duration-500 ease-in-out`}
                    >
                        {IconComponent && (
                            <IconComponent 
                            
                                className={`w-6 h-6 ${isActive ? 'invert-white' : ''}`}
                            />
                        )}
                        <p className="tiny-medium text-light-2 text-center">
                            {link.label}
                        </p>
                    </Link>
                );
            })}
        </section>
    );
}
export default BottomBar
