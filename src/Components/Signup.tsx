import type React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "./Auth";
import { useEffect, useState } from "react";
import supabaseClient from "./supabaseClient";

const Signup = () => {
    const navigate = useNavigate();

    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const { data: listener } = supabaseClient.auth.onAuthStateChange(
            async (event) => {
                if (event === "SIGNED_IN") {
                    navigate("/");
                }
            },
        );
        return () => listener.subscription.unsubscribe();
    }, [username]);

    async function handleSubmit() {
        //use regex to test for an email pattern TODO: disallow whitespace
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
            setError("ERROR: Email form does not contain a valid Email");
            return;
        }
        //Check for if username already exists
        const { data } = await supabaseClient
            .from("users")
            .select("username")
            .eq("username", username)
            .maybeSingle();
        if (data) {
            setError("ERROR:Username is already Taken");
            return;
        }
        //proceed with Login
        try {
            await signUp(email, password2, username);
            alert("Check your email to confirm your account");
        } catch (error: any) {
            setError(error.message);
            return;
        }
    }
    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password1 !== password2) {
            setError("ERROR: Passwords must match");
            return;
        }
        if (password1 == "" || password2 == "") {
            setError("ERROR: Password Fields Must be entered");
            return;
        }

        setError(null);
        handleSubmit();
    };

    return (
        <>
            <h1 className="text-center pt-4">Sign Up for Snipp-It</h1>
            <form
                className="container d-flex justify-content-center py-5"
                onSubmit={handlePasswordSubmit}
            >
                <div className="w-75 justify-content-center">
                    <input
                        type="text"
                        className="form-control  mb-4"
                        placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="text"
                        className="form-control  mb-4"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        className="form-control mb-4"
                        placeholder="Password"
                        onChange={(e) => setPassword1(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="form-control mb-4"
                        placeholder="Confirm Password"
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="btn btn-primary d-flex ms-auto w-10"
                    >
                        Sign up
                    </button>
                    {error && <p className="alert alert-danger">{error}</p>}
                    <p>
                        Already a user? <Link to="/login">click here</Link> to
                        go to the login page
                    </p>
                </div>
            </form>
        </>
    );
};

export default Signup;
