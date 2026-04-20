import { useEffect, useState } from "react";
import Grid from "./Grid";
import supabaseClient from "./supabaseClient";
import Snippet from "./Snippet";

interface SnippetRow {
    post_id: number;
    user_id: string;
    header: string;
    img: string | null;
    body: string;
}

const Home = () => {
    //empty array of snippets
    const [snippets, setSnippets] = useState<SnippetRow[]>([]);
    //track if data is still loading
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadSnippets = async () => {
            const { data, error } = await supabaseClient
                .from("Snippets")
                .select("*")
                .order("post_id", { ascending: true });

            if (error) {
                setError(error.message);
                return;
            }
            setSnippets(data || []);
            setLoading(false);
        };

        loadSnippets();
    }, []);

    if (loading) {
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

    return (
        <>
            <div className="mb-4">
                <h1 className="text-center pt-3 pb-2">Home</h1>
                {error && <p className="alert alert-danger">{error}</p>}
                <Grid
                    snippets={snippets.map((snippet) => (
                        <Snippet
                            key={snippet.post_id}
                            userID={snippet.user_id}
                            postID={snippet.post_id}
                            header={snippet.header}
                            body={snippet.body}
                            imgRef={snippet.img ?? undefined}
                        />
                    ))}
                />
            </div>
        </>
    );
};

export default Home;
