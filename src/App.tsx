import { Routes, Route } from "react-router-dom";

import SigninForm from "./_auth/forms/SigninForm.tsx";
import SignupForm from "./_auth/forms/SignupForm.tsx";
import AuthLayout from "./_auth/AuthLayout.tsx";
import RootLayout from "./_root/RootLayout.tsx";
import Home from "./_root/pages/Home.tsx";
import './globals.css';


const App = () => {
    return (
        <main className="flex h-screen">
            <Routes >
                {/*   Public Routes */}
                <Route element={<AuthLayout />} >
                    <Route  path="/sign-in" element={<SigninForm />}/>
                    <Route  path="/sign-up" element={<SignupForm />}/>
                </Route>
                {/*   Private Routes */}
                <Route element={<RootLayout />}>
                    <Route index element={<Home />}/>
                </Route>
            </Routes>

        </main>
    )
}
export default App