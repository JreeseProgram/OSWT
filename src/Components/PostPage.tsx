import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import GotoTop from "./GotoTop";
import { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import supabaseClient from "./supabaseClient";
import { SupabaseClient } from "@supabase/supabase-js";

const PostPage = () => {
    const { postID } = useParams();
    const { state } = useLocation();

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState<number | undefined>(0);
    const [username, setPostUsername] = useState<string | null>(null);
    const [pfp, setPfp] = useState<string | null>(null);
    const [ownPost, setOwnPost] = useState<boolean | null>(null);

    const user = useUser();

    function getImageUrl(path: string) {
        const { data } = supabaseClient.storage
            .from("snippet_images")
            .getPublicUrl(path);
        return data.publicUrl;
    }

    //Check if post is their own, then show EDIT button
    useEffect(() => {
        const checkUser = async () => {
            if (!user) {
                return;
            }

            const loggedUser = (await supabaseClient.auth.getUser()).data.user
                ?.id;
            const { data: id, error } = await supabaseClient
                .from("Snippets")
                .select("user_id")
                .eq("post_id", Number(postID))
                .single();

            if (error) {
                setOwnPost(false);
                alert("AAAAAAAAHHHHHHHHHHH:" + error.message);
            }

            if (loggedUser === String(id?.user_id)) {
                setOwnPost(true);
            } else {
                setOwnPost(false);
            }
        };
        checkUser();
    }, [user, postID]);

    //check if signed user has liked the post
    useEffect(() => {
        if (!user) {
            return;
        }
        const checkLike = async () => {
            const { data } = await supabaseClient
                .from("Like_Table")
                .select("*")
                .eq("snippet_id", postID)
                .eq("user_id", user.id)
                .maybeSingle();

            if (data) {
                setLiked(true);
            } else {
                setLiked(false);
            }
        };
        checkLike();
    }, [user, postID, SupabaseClient]);

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
    }, [supabaseClient, postID, liked]);

    //Retrieve Username
    useEffect(() => {
        const getUsername = async () => {
            const { data: userObject } = await supabaseClient
                .from("Snippets")
                .select("user_id")
                .eq("post_id", Number(postID))
                .single();

            const { data: username } = await supabaseClient
                .from("Profiles")
                .select("username")
                .eq("id", userObject?.user_id)
                .single();

            setPostUsername(username?.username);

            const { data: profile } = await supabaseClient
                .from("Profiles")
                .select("profile_picture")
                .eq("id", userObject?.user_id)
                .single();

            setPfp(profile?.profile_picture);
        };
        getUsername();
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
            //setError("You are not logged in");
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
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    if (state) {
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
                                {state.header}
                            </h1>
                            <div>
                                {state.imgRef && (
                                    <img
                                        src={getImageUrl(state.imgRef)}
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
                            <div className="d-flex align-items-left ps-3">
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
                            <p className="text-center">{state.body}</p>
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
                        </div>
                    </div>
                </div>
            </>
        );
    }

    const [snippet, setSnippet] = useState<any>(null);
    const [isSnippet, setSnippetStatus] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPost = async () => {
            const { data, error } = await supabaseClient
                .from("Snippets")
                .select("*")
                .eq("post_id", Number(postID))
                .single();
            if (error) {
                setSnippetStatus(false);
                setLoading(false);
                return;
            } else if (data === null) {
                setLoading(false);
                setSnippetStatus(false);
                return;
            }
            setSnippet(data);
            setSnippetStatus(true);
            setLoading(false);
        };
        loadPost();
    }, [postID, user]);

    if (loading) {
        return <h3 className="pt-3 center-text">Loading...</h3>;
    }

    if (!isSnippet && !loading) {
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

    if (isSnippet && !loading) {
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
                            <div className="d-flex align-items-left ps-3">
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
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default PostPage;
