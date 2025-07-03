import { Routes, Route } from "react-router-dom";

import './globals.css';
import Home from "./_root/pages/Home.tsx";
import SigninForm from "./_auth/forms/SigninForm.tsx";

const App = () => {
    return (
        <main className="flex h-screen">
            <Routes>
            {/*   Public Routes */}
                <Route  path="/sign-in" element={<SigninForm />}/>
            {/*   Private Routes */}
                    <Route index element={<Home />}/>
            </Routes>

        </main>
    )
}
export default App
