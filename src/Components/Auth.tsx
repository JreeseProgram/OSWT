import supabaseClient from "./supabaseClient";
import { useUser } from "./UserContext";
import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";

export async function signUp(
    email: string,
    password: string,
    username: string,
) {
    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: import.meta.env.SITE_LINK + "/confirmSignUp",
            data: {
                display_name: username,
            },
        },
    });
    if (error) throw error;
    return data;
}

export async function signIn(email: string, password: string) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;
    return data;
}

//Easy wrapper to redirect to signup
export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const user = useUser();
    const [sessionReady, setSessionReady] = useState(false);
    const [sessionExists, setSessionExists] = useState(false);

    useEffect(() => {
        async function checkStatus() {
            const { data } = await supabaseClient.auth.getSession();
            // the double not !! basically looks for things like undefined or
            // normal null/false things then makes anything else true
            setSessionExists(!!data.session);
            setSessionReady(true);
        }
        checkStatus();
    }, []);

    if (!sessionReady) {
        return null;
    }
    if (!sessionExists && !user) {
        return <Navigate to="/login" replace />;
    }
    return children;
}
