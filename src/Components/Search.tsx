import React, { useState } from "react";
import Grid from "./Grid";
import Snippet from "./Snippet";
import supabaseClient from "./supabaseClient";

interface SnippetRow {
    post_id: number;
    user_id: string;
    header: string;
    img: string | null;
    body: string;
}

const Search = () => {
    const [snippets, setSnippets] = useState<SnippetRow[]>([]);
    const [search, setSearch] = useState("");

    const loadQuery = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data, error } = await supabaseClient
            .from("Snippets")
            .select("*")
            .or(`header.ilike.%${search}%,body.ilike.%${search}%`);

        if (error) {
            console.error(error);
        }
        setSnippets(data || []);
    };

    return (
        <>
            <h1 className="text-center mt-4">Search</h1>
            <form className="mt-5 mb-5 mx-3 d-flex" onSubmit={loadQuery}>
                <input
                    type="text"
                    className="form-control me-2"
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                ></input>
                <button type="submit" className="btn btn-secondary">
                    Search
                </button>
            </form>

            {snippets.length > 0 && (
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
            )}
            {snippets.length === 0 && (
                <h3 className="text-center">No Posts Found</h3>
            )}
        </>
    );
};

export default Search;
