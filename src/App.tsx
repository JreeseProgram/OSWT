import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import type { NavItems } from "./Components/Navbar";
import CreatePost from "./Components/CreatePost";
import UserPage from "./Components/UserPage";
import UserProfile from "./Components/UserProfile";
import About from "./Components/About";

//Site Config
const navbarItems: NavItems[] = [
    { text: "Home", path: "/" },
    { text: "Post", path: "/createPost" },
    { text: "My Page", path: "/userPage" },
    { text: "My Profile", path: "/userProfile" },
    { text: "About Us", path: "/about" },
];

function App() {
    return (
        <>
            <Navbar
                siteTitle="Temporary Site Title"
                navbarElements={navbarItems}
            />
            <div className="mt-5 pt-4 mx-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/createPost" element={<CreatePost />} />
                    <Route path="/userPage" element={<UserPage />} />
                    <Route path="/userProfile" element={<UserProfile />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
