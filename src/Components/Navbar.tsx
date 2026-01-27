import { Link } from "react-router-dom";

//makes a simple template for how to get incoming data for dynamic elements
export interface NavItems {
    text: string;
    path: string;
}

interface Props {
    siteTitle: string;
    navbarElements: NavItems[];
}

const Navbar = ({ siteTitle, navbarElements }: Props) => {
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
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            {navbarElements.map((element) => (
                                <li className="nav-item" key={element.path}>
                                    <Link to={element.path}>
                                        <button
                                            type="button"
                                            data-bs-dismiss="offcanvas"
                                        >
                                            {element.text}
                                        </button>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
