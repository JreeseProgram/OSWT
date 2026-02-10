import type React from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        //TODO: fwd to backend for verification; add email verification
        e.preventDefault();
        console.log("Accepted!");

        navigate("/");
    };
    return (
        <>
            <h1 className="text-center pt-4">Sign Up for PLACEHOLDER</h1>
            <form
                className="container d-flex justify-content-center py-5"
                onSubmit={handleSubmit}
            >
                <div className="w-50 justify-content-center">
                    <input
                        type="text"
                        className="form-control  mb-3"
                        placeholder="Email"
                        required
                    />

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
                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Confirm Password"
                        required
                    />
                    <button
                        type="submit"
                        className="btn btn-primary d-flex ms-auto w-10"
                    >
                        Sign up
                    </button>
                </div>
            </form>
        </>
    );
};

export default Signup;
