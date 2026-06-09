import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import CreateMeme from "./pages/CreateMeme";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

function App() {

    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<Feed />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                <Route
                    path="/create"
                    element={<CreateMeme />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="/profile/:id"
                    element={<Profile />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;