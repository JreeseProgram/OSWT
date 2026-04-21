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

export const sorting = {
    Alphabetical: "header",
    Date: "created_at",
} as const;

export type sorting = (typeof sorting)[keyof typeof sorting];

const Home = () => {
    //empty array of snippets
    const [snippets, setSnippets] = useState<SnippetRow[]>([]);
    //track if data is still loading
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isAsc, setAsc] = useState<boolean>(true);

    const [sortOption, setSortOption] = useState<sorting>(sorting.Date);

    useEffect(() => {
        const loadSnippets = async () => {
            setLoading(true);
            const { data, error } = await supabaseClient
                .from("Snippets")
                .select("*")
                .order(sortOption, { ascending: isAsc });

            if (error) {
                setError(error.message);
                return;
            }
            setSnippets(data || []);
            setLoading(false);
        };

        loadSnippets();
    }, [isAsc, sortOption]);

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

                <div className="d-flex flex-column ms-2 mx-2 my-3">
                    <h4 className="text-center">Sort</h4>
                    <select
                        className="form-select w-80 mt-2 mb-1 me-2"
                        value={sortOption}
                        onChange={(e) =>
                            setSortOption(e.target.value as sorting)
                        }
                    >
                        <option value={sorting.Alphabetical}>
                            Alphabetical
                        </option>
                        <option value={sorting.Date}>Date</option>
                    </select>
                    <select
                        className="form-select w-10"
                        value={isAsc ? "true" : "false"}
                        onChange={(e) => setAsc(e.target.value === "true")}
                    >
                        <option value="true">Ascending</option>
                        <option value="false">Descending</option>
                    </select>
                </div>
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
