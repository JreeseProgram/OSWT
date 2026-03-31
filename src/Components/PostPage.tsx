import { Link, useNavigate, useParams } from "react-router-dom";
import GotoTop from "./GotoTop";
import React, { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import supabaseClient from "./supabaseClient";

interface Comment {
    id: number;
    post_id: number;
    user_id: string;
    username: string;
    comment: string;
    created_at: string;
}

const PostPage = () => {
    const { postID } = useParams();

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState<number | undefined>(0);

    const [retrievedComments, setRetrievedComments] = useState<Comment[]>([]);

    const [username, setPostUsername] = useState<string | null>(null);
    const [pfp, setPfp] = useState<string | null>(null);
    const [posterID, setPosterID] = useState<string>("");

    const [comment, setComment] = useState("");

    const [ownPost, setOwnPost] = useState<boolean | null>(null);

    const [snippet, setSnippet] = useState<any>(null);
    const [isSnippet, setSnippetStatus] = useState(false);
    const [snippetLoading, setSnippetLoading] = useState(true);

    const [userLoading, setUserLoading] = useState(true);

    const user = useUser();
    const navigate = useNavigate();

    function getImageUrl(path: string) {
        const { data } = supabaseClient.storage
            .from("snippet_images")
            .getPublicUrl(path);
        return data.publicUrl;
    }

    //Check Total Likes
    useEffect(() => {
        const findLikes = async () => {
            const { data, error } = await supabaseClient
                .from("Like_Table")
                .select("*")
                .eq("snippet_id", Number(postID));

            if (error) {
                setLikeCount(0);
            } else {
                setLikeCount(data?.length || 0);
            }
        };
        findLikes();
        if (!user) {
            return;
        }
        const checkLike = async () => {
            const { data } = await supabaseClient
                .from("Like_Table")
                .select("*")
                .eq("snippet_id", Number(postID))
                .eq("user_id", user.id)
                .maybeSingle();

            if (data) {
                setLiked(true);
            } else {
                setLiked(false);
            }
        };
        checkLike();
    }, [user, postID, liked]);

    //Retrieve Username
    useEffect(() => {
        const getUsername = async () => {
            setUserLoading(true);
            const { data: userObject } = await supabaseClient
                .from("Snippets")
                .select("user_id")
                .eq("post_id", Number(postID))
                .single();

            const { data: profile } = await supabaseClient
                .from("Profiles")
                .select("username, profile_picture")
                .eq("id", userObject?.user_id)
                .single();

            setPostUsername(profile?.username);

            setPfp(
                supabaseClient.storage
                    .from("profile_pics")
                    .getPublicUrl(profile?.profile_picture).data.publicUrl,
            );
            setUserLoading(false);
        };
        getUsername();
    }, [postID]);

    // Retrieves post information
    useEffect(() => {
        const loadPost = async () => {
            const { data, error } = await supabaseClient
                .from("Snippets")
                .select("*")
                .eq("post_id", Number(postID))
                .single();
            if (error) {
                setSnippetStatus(false);
                setSnippetLoading(false);
                return;
            } else if (data === null) {
                setSnippetLoading(false);
                setSnippetStatus(false);
                return;
            }
            setSnippet(data);
            setSnippetStatus(true);
            setPosterID(data.user_id);
            setSnippetLoading(false);
        };
        loadPost();
    }, [postID, user]);

    //Check if post is their own, then show EDIT button
    useEffect(() => {
        if (!user) {
            return;
        }
        if (!posterID) {
            return;
        }
        setOwnPost(user.id === posterID);
        return;
    }, [posterID]);

    //Load all comments
    useEffect(() => {
        const getComments = async () => {
            const { data, error } = await supabaseClient
                .from("Comments")
                .select("*")
                .eq("post_id", Number(postID))
                .order("created_at", { ascending: true });

            if (error) {
                alert(error.message);
                return;
            }
            setRetrievedComments(data);
        };
        getComments();
    }, [postID]);

    const btnClassname = liked
        ? "thumbs-up-fill d-flex flex-column mt-auto"
        : "thumbs-up-hollow d-flex flex-column mt-auto";

    function handleEditClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        navigate("/editPost/" + postID);
    }

    async function handleLikeClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        if (!user) {
            alert("You are not logged in");
            return;
        }

        const { error } = await supabaseClient
            .from("Like_Table")
            .select("*")
            .eq("snippet_id", Number(postID))
            .eq("user_id", user.id)
            .single();

        //Error code for no rows
        if (error?.code === "PGRST116") {
            await supabaseClient.from("Like_Table").insert({
                snippet_id: Number(postID),
                user_id: user.id,
            });
            setLiked(true);
        } else if (error) {
            alert(error.message);
            return;
        } else {
            await supabaseClient
                .from("Like_Table")
                .delete()
                .eq("user_id", user.id)
                .eq("snippet_id", Number(postID));
            setLiked(false);
        }
    }

    const handleCommentPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user) {
            alert("Please sign in to comment");
            return;
        }
        if (comment.length < 1) {
            return;
        }

        const { error } = await supabaseClient.from("Comments").insert({
            post_id: Number(postID),
            user_id: user.id,
            username: user.user_metadata.display_name,
            comment: comment,
        });

        if (error) {
            alert(error.message);
            return;
        }
        setComment("");

        navigate(0);
    };
    const handleBack = () => {
        navigate(-1);
    };

    if (snippetLoading) {
        return <h3 className="pt-3 center-text">Loading...</h3>;
    }

    if (!isSnippet && !snippetLoading) {
        return (
            <>
                <GotoTop />
                <div className="justify-content-center pt-5">
                    <h1 className="text-center">POST IS NOT FOUND</h1>
                    <h3 className="text-center">
                        Please return to <Link to="/">Home</Link>
                    </h3>
                </div>
            </>
        );
    }

    if (isSnippet && !snippetLoading && !userLoading) {
        return (
            <>
                <GotoTop />
                <div
                    style={{
                        background: "rgba(0,0,0,0.15)",
                        minHeight: "100vh",
                    }}
                >
                    <div
                        className="container d-flex justify-content-center h-100"
                        style={{
                            position: "relative",
                            zIndex: 2,
                            minHeight: "100vh",
                        }}
                    >
                        <div
                            style={{
                                maxWidth: "700px",
                                width: "100%",
                                background: "white",
                            }}
                        >
                            <button
                                style={{
                                    background: "none",
                                    fontSize: "1.2rem",
                                    cursor: "pointer",
                                    marginBottom: "1rem",
                                }}
                                className="btn btn-outline-secondary mt-3"
                                onClick={handleBack}
                            >
                                {"<"}
                            </button>
                            <h1 className="text-center pb-3 pt-3">
                                {snippet.header}
                            </h1>
                            <div>
                                {snippet.img && (
                                    <img
                                        src={getImageUrl(snippet.img)}
                                        className="img-fluid d-block mx-auto my-3 pb-3"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            aspectRatio: "16/9",
                                            objectFit: "cover",
                                        }}
                                    />
                                )}
                            </div>
                            <div
                                className="d-flex align-items-left ps-3"
                                onClick={() => {
                                    navigate(`/userPage/${posterID}`);
                                }}
                                style={{ cursor: "pointer" }}
                            >
                                <img
                                    src={String(pfp)}
                                    className="rounded object-fit-cover"
                                    style={{ width: "40px", height: "40px" }}
                                />
                                <h3 className="ps-3 text-center">{username}</h3>
                            </div>
                            <div className="d-flex justify-content-end mt-auto">
                                <h3>{likeCount}</h3>
                                <button
                                    onClick={handleLikeClick}
                                    className={btnClassname}
                                ></button>
                            </div>
                            <p className="text-center">{snippet.body}</p>
                            {ownPost && (
                                <div className=" w-100 d-flex justify-content-center pt-3">
                                    <button
                                        className="btn btn-warning"
                                        style={{ width: "650px" }}
                                        onClick={handleEditClick}
                                    >
                                        Edit
                                    </button>
                                </div>
                            )}
                            {user && (
                                <form
                                    className="d-flex my-3 mx-2"
                                    onSubmit={handleCommentPost}
                                >
                                    <input
                                        type="textarea"
                                        className="form-control"
                                        onChange={(e) => {
                                            setComment(e.target.value);
                                        }}
                                    ></input>
                                    <button className="btn btn-success ms-2">
                                        Post
                                    </button>
                                </form>
                            )}
                            <div className="my-2 mx-2">
                                {retrievedComments.length > 0 &&
                                    retrievedComments.map((c) => (
                                        <div key={c.id} className="comment">
                                            <strong>{c.username}: </strong>
                                            <span>{c.comment}</span>
                                        </div>
                                    ))}
                                {retrievedComments.length == 0 && (
                                    <h3 className="text-center">
                                        No Comments Posted Yet
                                    </h3>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default PostPage;
