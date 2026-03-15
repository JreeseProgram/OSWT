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
import EditPost from "./Components/EditPost";
import { UserProvider } from "./Components/UserContext";
import { ProtectedRoute } from "./Components/Auth";
import ConfirmSignUp from "./Components/ConfirmSignUp";

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
        <UserProvider>
            <div className="pb-5">
                <Navbar siteTitle="Snipp-it" navbarElements={navbarItems} />
            </div>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/createPost"
                        element={
                            <ProtectedRoute>
                                <CreatePost />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/userPage"
                        element={
                            <ProtectedRoute>
                                <UserPage
                                    username="user_835"
                                    profilePic="https://placehold.co/300x300/png"
                                />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/userProfile"
                        element={
                            <ProtectedRoute>
                                <UserProfile />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/confirmSignUp" element={<ConfirmSignUp />} />
                    <Route path="/:postID" element={<PostPage />} />
                    <Route
                        path="/editPost/:postID"
                        element={
                            <ProtectedRoute>
                                <EditPost />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </UserProvider>
    );
}
export default App;
