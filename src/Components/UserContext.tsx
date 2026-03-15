//Basically this is used to access User information
//Anywhere in the app, will be used in App.tsx (the root)
//Call useUser() to get user info

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import supabaseClient from "./supabaseClient";
import type { User } from "@supabase/supabase-js";

const UserContext = createContext<User | null>(null);
//Wrapper for components under to access user state
export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        //Checks if session exists and gets user if so
        supabaseClient.auth.getSession().then(({ data }) => {
            setUser(data.session?.user ?? null);
        });

        //Checks for session changes
        const { data: listener } = supabaseClient.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            },
        );
        //Removes listener
        return () => listener.subscription.unsubscribe();
    }, []);

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
    return useContext(UserContext);
}
