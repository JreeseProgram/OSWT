import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import type { NavItems } from "./Components/Navbar";
import CreatePost from "./Components/CreatePost";
import UserPage from "./Components/UserPage";
import UserProfile from "./Components/UserProfile";
import About from "./Components/About";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import PostPage from "./Components/PostPage";

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
            <div className="pb-5">
                <Navbar
                    siteTitle="Temporary Site Title"
                    navbarElements={navbarItems}
                    //username="user_1837"
                />
            </div>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/createPost" element={<CreatePost />} />
                    <Route
                        path="/userPage"
                        element={
                            <UserPage
                                username="user_835"
                                profilePic="https://placehold.co/300x300/png"
                            />
                        }
                    />
                    <Route
                        path="/userProfile"
                        element={
                            <UserProfile
                                email="example@email.com"
                                username="my_user143"
                            />
                        }
                    />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/:postId" element={<PostPage />} />
                </Routes>
            </div>
        </>
    );
}
export default App;
