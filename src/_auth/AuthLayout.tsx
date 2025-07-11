import { Outlet, Navigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";

const AuthLayout = () => {
    const isAuthenticated = false;
    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Interactive Spline scene with lower z-index */}
            <div className="relative w-full h-full" style={{ zIndex: 0 }}>
                <Spline 
                    scene="https://prod.spline.design/mpOuNY1vq40Y8ADP/scene.splinecode"
                    className="w-full h-full" 
                />
            </div>
            
            {/* Content layer with higher z-index that overlays the scene */}
            <div className="absolute inset-0 z-10 flex justify-center items-center pointer-events-none">
                {isAuthenticated ? (
                    <Navigate to="/" />
                ) : (
                    <div className="w-full max-w-md px-4">
                        <section className="flex flex-col items-center justify-center w-full">
                            {/* Make the actual interactive elements receive pointer events */}
                            <div className="pointer-events-auto">
                                <Outlet />
                            </div>
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthLayout;