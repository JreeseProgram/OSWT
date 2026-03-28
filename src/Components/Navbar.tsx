import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import supabaseClient from "./supabaseClient";

interface Props {
    siteTitle: string;
}

const Navbar = ({ siteTitle }: Props) => {
    const user = useUser();
    const navigate = useNavigate();

    return (
        <nav
            className="navbar nav-bg-color bg-body-tertiary fixed-top"
            style={{ background: "#AECCE8" }}
        >
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <Link className="navbar-brand mx-auto" to="/">
                    {siteTitle}
                </Link>
                <div
                    className="offcanvas nav-bg-color offcanvas-start"
                    tabIndex={-1}
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                >
                    <div className="offcanvas-header justify-content-center">
                        <h4
                            className="offcanvas-title"
                            id="offcanvasNavbarLabel"
                        >
                            {siteTitle}
                        </h4>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        />
                    </div>
                    <div className="offcanvas-body d-flex flex-column">
                        <ul className="navbar-nav w-100 pe-3 my-0">
                            <li className="nav-item w-100 border-bottom border-top">
                                <Link
                                    className="nav-link d-block py-2 text-center"
                                    to={"/"}
                                >
                                    <button
                                        type="button"
                                        data-bs-dismiss="offcanvas"
                                        className="fs-3 w-100 text-center border-0 bg-transparent"
                                    >
                                        {"Home"}
                                    </button>
                                </Link>
                            </li>
                            <li className="nav-item w-100 border-bottom border-top">
                                <Link
                                    className="nav-link d-block py-2 text-center"
                                    to={"/search"}
                                >
                                    <button
                                        type="button"
                                        data-bs-dismiss="offcanvas"
                                        className="fs-3 w-100 text-center border-0 bg-transparent"
                                    >
                                        {"Search"}
                                    </button>
                                </Link>
                            </li>
                            <li className="nav-item w-100 border-bottom border-top">
                                <Link
                                    className="nav-link d-block py-2 text-center"
                                    to={"/createPost"}
                                >
                                    <button
                                        type="button"
                                        data-bs-dismiss="offcanvas"
                                        className="fs-3 w-100 text-center border-0 bg-transparent"
                                    >
                                        {"Post"}
                                    </button>
                                </Link>
                            </li>
                            <li className="nav-item w-100 border-bottom border-top">
                                <Link
                                    className="nav-link d-block py-2 text-center"
                                    to={
                                        user ? `/userPage/${user.id}` : "/login"
                                    }
                                >
                                    <button
                                        type="button"
                                        data-bs-dismiss="offcanvas"
                                        className="fs-3 w-100 text-center border-0 bg-transparent"
                                    >
                                        {"My Page"}
                                    </button>
                                </Link>
                            </li>
                            <li className="nav-item w-100 border-bottom border-top">
                                <Link
                                    className="nav-link d-block py-2 text-center"
                                    to={"/userProfile"}
                                >
                                    <button
                                        type="button"
                                        data-bs-dismiss="offcanvas"
                                        className="fs-3 w-100 text-center border-0 bg-transparent"
                                    >
                                        {"My Profile"}
                                    </button>
                                </Link>
                            </li>
                            <li className="nav-item w-100 border-bottom border-top">
                                <Link
                                    className="nav-link d-block py-2 text-center"
                                    to={"/about"}
                                >
                                    <button
                                        type="button"
                                        data-bs-dismiss="offcanvas"
                                        className="fs-3 w-100 text-center border-0 bg-transparent"
                                    >
                                        {"About Us"}
                                    </button>
                                </Link>
                            </li>
                        </ul>
                        <div className="mt-auto d-flex border-top pt-3">
                            {!user && (
                                <Link to="/login" className="ms-auto">
                                    <button
                                        type="button"
                                        className="btn btn-lg btn-primary"
                                        data-bs-dismiss="offcanvas"
                                    >
                                        Login
                                    </button>
                                </Link>
                            )}
                            {user && (
                                <>
                                    <h3 className="text-start">
                                        {user.user_metadata.display_name}
                                    </h3>
                                    <button
                                        type="button"
                                        className="btn btn-lg btn-outline-primary ms-auto"
                                        data-bs-dismiss="offcanvas"
                                        onClick={async () => {
                                            await supabaseClient.auth.signOut();
                                            navigate("/");
                                        }}
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
