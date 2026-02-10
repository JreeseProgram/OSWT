import { Link } from "react-router-dom";

//makes a simple template for how to get incoming data for dynamic elements
export interface NavItems {
    text: string;
    path: string;
}

interface Props {
    siteTitle: string;
    navbarElements: NavItems[];
    username?: string;
}

const Navbar = ({ siteTitle, navbarElements, username }: Props) => {
    return (
        <nav className="navbar bg-body-tertiary fixed-top">
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
                    className="offcanvas offcanvas-start"
                    tabIndex={-1}
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                >
                    <div className="offcanvas-header">
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
                    {/** This makes each list dynamically and auto-close on hitting a link, allowing reuse of this component */}
                    <div className="offcanvas-body d-flex flex-column">
                        <ul className="navbar-nav w-100 pe-3 my-0">
                            {navbarElements.map((element) => (
                                <li
                                    className="nav-item w-100 border-bottom border-top"
                                    key={element.path}
                                >
                                    <Link
                                        className="nav-link d-block py-2 text-center"
                                        to={element.path}
                                    >
                                        <button
                                            type="button"
                                            data-bs-dismiss="offcanvas"
                                            className="fs-3 w-100 text-center border-0 bg-transparent"
                                        >
                                            {element.text}
                                        </button>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-auto d-flex border-top pt-3">
                            {!username && (
                                <Link to="/login" className="ms-auto">
                                    <button
                                        type="button"
                                        className="btn btn-lg btn-outline-primary"
                                        data-bs-dismiss="offcanvas"
                                    >
                                        Login
                                    </button>
                                </Link>
                            )}
                            {username && (
                                <>
                                    <h3 className="text-start">{username}</h3>
                                    <button
                                        type="button"
                                        className="btn btn-lg btn-outline-primary ms-auto"
                                        data-bs-dismiss="offcanvas"
                                        onClick={() => {
                                            console.log("logout performed");
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
