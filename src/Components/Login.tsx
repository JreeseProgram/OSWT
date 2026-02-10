import { Link } from "react-router";

const Login = () => {
    return (
        <>
            <h1 className="text-center pt-4">Login to PLACEHOLDER</h1>
            <form className="container d-flex justify-content-center py-5">
                <div className="w-50 justify-content-center">
                    <input
                        type="text"
                        className="form-control  mb-3"
                        placeholder="Username"
                        required
                    />

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Password"
                        required
                    />
                    <button
                        type="submit"
                        className="btn btn-primary d-flex ms-auto w-10"
                    >
                        Login
                    </button>
                    <p>
                        Not a user? <Link to="/signup">Sign Up Here</Link>
                    </p>
                </div>
            </form>
        </>
    );
};

export default Login;
