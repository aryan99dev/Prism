import { Routes, Route } from "react-router-dom";

import SigninForm from "./_auth/forms/SigninForm.tsx";
import SignupForm from "./_auth/forms/SignupForm.tsx";
import AuthLayout from "./_auth/AuthLayout.tsx";
import RootLayout from "./_root/RootLayout.tsx";
import Home from "./_root/pages/Home.tsx";
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import ErrorBoundary from "@/ErrorBoundary.tsx";
import Explore from "./_root/pages/Explore.tsx";
import Saved from "./_root/pages/Saved.tsx";
import AllUsers from "./_root/pages/AllUsers.tsx";
import CreatePost from "./_root/pages/CreatePost.tsx";
import EditPost from "./_root/pages/EditPost.tsx";
import PostDetails from "./_root/pages/PostDetails.tsx";
import Profile from "./_root/pages/Profile.tsx";
import UpdateProfile from "./_root/pages/UpdateProfile.tsx";
import LikedPost from "./_root/pages/LikedPost.tsx";



const App = () => {
    return (
        <main className="flex h-screen">
            <ErrorBoundary>
            <Routes >
                {/*   Public Routes */}
                <Route element={<AuthLayout />} >
                    <Route  path="/sign-in" element={<SigninForm />}/>
                    <Route  path="/sign-up" element={<SignupForm />}/>
                </Route>
                {/*   Private Routes */}
                <Route element={<RootLayout />}>
                    <Route index element={<Home />}/>
                    <Route  path="/explore" element={<Explore/>}/>
                    <Route  path="/saved" element={<Saved/>}/>
                    <Route  path="/all-users" element={<AllUsers/>}/>
                    <Route  path="/create-post" element={<CreatePost/>}/>
                    <Route  path="/update-post/:id" element={<EditPost/>}/>
                    <Route  path="/posts/:id" element={<PostDetails/>}/>
                    <Route  path="/profile/:id/*" element={<Profile/>}/>
                    <Route  path="/update-profile/:id" element={<UpdateProfile/>}/>
                    <Route  path="/liked-post" element={<LikedPost/>}/>
                </Route>
            </Routes>
            </ErrorBoundary>
            <Toaster />
        </main>
    )
}
export default App