import { useEffect, useState } from "react";
import Grid from "./Grid";
import Snippet from "./Snippet";
import supabaseClient from "./supabaseClient";
import { Link, useParams } from "react-router-dom";

interface SnippetRow {
    post_id: string;
    user_id: string;
    header: string;
    img: string | null;
    body: string;
}

const UserPage = () => {
    //empty array of snippets
    const [snippets, setSnippets] = useState<SnippetRow[]>([]);
    //track if data is still loading
    const [snippetLoading, setSnippetLoading] = useState(true);
    const [userLoading, setUserLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [username, setUsername] = useState<string | null>(null);
    const [pfp, setPfp] = useState<string | null>(null);
    const [validUser, setValidUser] = useState(false);

    const { userID } = useParams();

    //Ensures all is reset each time
    useEffect(() => {
        setUserLoading(true);
        setSnippetLoading(true);
    }, [userID]);

    //get user info
    useEffect(() => {
        const getInfo = async () => {
            //username
            const { data: profile } = await supabaseClient
                .from("Profiles")
                .select("username, profile_picture")
                .eq("id", userID)
                .single();

            if (!profile) {
                setValidUser(false);
                setUserLoading(false);
                return;
            }

            setPfp(
                supabaseClient.storage
                    .from("profile_pics")
                    .getPublicUrl(profile.profile_picture).data.publicUrl,
            );
            setUsername(profile.username);
            setValidUser(true);
            setUserLoading(false);
        };
        getInfo();
    }, [userID]);

    //gets snippets
    useEffect(() => {
        const loadSnippets = async () => {
            const { data, error } = await supabaseClient
                .from("Snippets")
                .select("*")
                .eq("user_id", userID)
                .order("post_id", { ascending: true });

            if (error) {
                setError(error.message);
                return;
            }
            setSnippets(data || []);
            setSnippetLoading(false);
        };

        loadSnippets();
    }, [userID]);

    if (snippetLoading || userLoading) {
        return (
            <>
                <div className="mb-4">
                    <h1 className="text-center pt-3 pb-2">Home</h1>
                    <p className="text-center alert pt-2">Loading...</p>
                    {error && <p className="alert alert-danger">{error}</p>}
                </div>
            </>
        );
    }
    if (!userLoading && !snippetLoading && !validUser) {
        return (
            <div>
                <h1 className="text-center">User Not Found</h1>
                <h3 className="text-center">
                    <Link to="/">Click Here</Link> to go home
                </h3>
            </div>
        );
    }

    if (!userLoading && !snippetLoading && validUser) {
        return (
            <>
                <div className="mb-4">
                    <div className="d-flex align-items-center justify-content-center py-3 pb-4">
                        <img src={String(pfp)} style={{ height: "60px" }}></img>
                        <h1 className="ms-3">{username + "'s Page"}</h1>
                    </div>
                    {error && <p className="alert alert-danger">{error}</p>}
                    <Grid
                        snippets={snippets.map((snippet) => (
                            <Snippet
                                key={snippet.post_id}
                                userID={snippet.user_id}
                                postID={Number(snippet.post_id)}
                                header={snippet.header}
                                body={snippet.body}
                                imgRef={snippet.img ?? undefined}
                            />
                        ))}
                    />
                </div>
            </>
        );
    }
};

export default UserPage;
