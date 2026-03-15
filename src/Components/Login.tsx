import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { signIn } from "./Auth";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        //use regex to test for an email pattern
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
            setError("ERROR: Email form does not contain a valid Email");
            return;
        }

        try {
            await signIn(email.trim(), password);
            navigate("/");
        } catch (error: any) {
            setError(error.message);
            return;
        }
    }

    return (
        <>
            <h1 className="text-center pt-4">Login to Snipp-It</h1>
            <form
                className="container d-flex justify-content-center py-5"
                onSubmit={handleLogin}
            >
                <div className="w-75 justify-content-center">
                    <input
                        type="text"
                        className="form-control  mb-3"
                        placeholder="Email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        required
                    />

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
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
                    <br />
                    {error && <p className="alert alert-danger">{error}</p>}
                </div>
            </form>
        </>
    );
};

export default Login;
