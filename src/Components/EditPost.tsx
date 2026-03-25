import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import supabaseClient from "./supabaseClient";
import { useUser } from "./UserContext";
import GotoTop from "./GotoTop";

const EditPost = () => {
    const { postID } = useParams();
    const navigate = useNavigate();

    const [image, setImage] = useState<string | null>(null);
    const [snippet, setSnippet] = useState<any>(null);
    const [isSnippet, setSnippetStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    const [validUser, setValidUser] = useState(false);
    const [newHeader, setNewHeader] = useState<string | null>(null);
    const [newImg, setNewImg] = useState<File | null>(null);
    const [newBody, setNewBody] = useState<string | null>(null);

    const user = useUser();

    function getImageUrl(path: string) {
        const { data } = supabaseClient.storage
            .from("snippet_images")
            .getPublicUrl(path);

        return data.publicUrl;
    }

    const handleDeletion = async () => {
        const validUser = await checkValidUser();

        if (!validUser) {
            return;
        } else {
            const confirmation = window.confirm(
                "Are you sure you want to delete this post?",
            );
            if (!confirmation) {
                return;
            }

            //Check for if image exists, delete it first
            if (snippet?.img) {
                await supabaseClient.storage
                    .from("snippet_images")
                    .remove(snippet?.img);
            }

            const { error } = await supabaseClient
                .from("Snippets")
                .delete()
                .eq("post_id", Number(postID));

            if (!error) {
                alert("Post has been deleted");
                navigate("/");
            }
        }
    };

    const handleEdit = async () => {
        const update: any = {};
        update.header = snippet.header;
        update.img = snippet.img;
        update.body = snippet.body;

        let filePath = null;

        if (newHeader) update.header = newHeader;
        if (newBody) update.body = newBody;

        if (newImg) {
            filePath = `${user?.id}/${crypto.randomUUID()}-${newImg.name}`;
            const { error } = await supabaseClient.storage
                .from("snippet_images")
                .upload(filePath, newImg);
            if (error) {
                alert("Error uploading:" + error.message);
                return;
            }
            if (snippet.img) {
                await supabaseClient.storage
                    .from("snippet_images")
                    .remove([snippet.img]);
            }
        }

        await supabaseClient
            .from("Snippets")
            .update({
                header: update.header,
                img: filePath ?? update.img, //not pretty but works
                body: update.body,
            })
            .eq("post_id", Number(postID))
            .select();

        alert("Edit was successful");
        navigate(`/${postID}`);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setNewImg(file);
            setImage(URL.createObjectURL(file));
        }
    };

    async function checkValidUser() {
        if (!user) {
            setValidUser(false);
            alert("You are not logged in");
            return false;
        }
        const loggedUser = (await supabaseClient.auth.getUser()).data.user?.id;

        const { data: id, error } = await supabaseClient
            .from("Snippets")
            .select("user_id")
            .eq("post_id", Number(postID))
            .single();

        if (error) {
            alert("AAAAAAAAHHHHHHHHHHH:" + error.message);
        }

        if (!loggedUser || !id?.user_id) {
            return false;
        }

        let result = loggedUser === id?.user_id;

        setValidUser(result);

        return result;
    }
    //Get snippet data
    useEffect(() => {
        const loadPost = async () => {
            let isGood = await checkValidUser();

            if (isGood) {
                const { data, error } = await supabaseClient
                    .from("Snippets")
                    .select("*")
                    .eq("post_id", Number(postID))
                    .single();

                if (error) {
                    setSnippetStatus(false);
                    return;
                } else if (data == null) {
                    setSnippetStatus(false);
                }

                setSnippet(data);
                setSnippetStatus(true);
            }
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
                <div className="d-block justify-content-center pt-5">
                    <h1>POST IS NOT FOUND</h1>
                    <h3>
                        Please return to <Link to="/">Home</Link>
                    </h3>
                </div>
            </>
        );
    }

    if (!loading && !validUser) {
        return (
            <>
                <div className="alert alert-danger justify-content-top text-center">
                    <h1 className="danger">UNAUTHORIZED</h1>
                    <p>
                        you cannot edit this post, please return{" "}
                        <Link to="/"> home</Link>
                    </p>
                </div>
            </>
        );
    }

    if (isSnippet && !loading && validUser) {
        return (
            <>
                <h1 className="text-center pt-3">Edit a Post</h1>
                <form className="container py-5">
                    {/* Title */}
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Title Here"
                            defaultValue={snippet.header}
                            onChange={(e) => setNewHeader(e.target.value)}
                            required
                        />
                    </div>
                    {/* Image */}
                    <div className="mb-3">
                        <label className="form-label">
                            Upload Image {"(Optional) (2MB Max Size)"}
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            className="form-control"
                            onChange={handleImageUpload}
                        />
                        {snippet.img && image == null && (
                            <div className="mb-3 mt-3 d-flex justify-content-center">
                                <img
                                    src={getImageUrl(snippet.img)}
                                    className="img-fluid rounded mb-3"
                                    style={{ maxHeight: "250px" }}
                                />
                            </div>
                        )}
                        {image && (
                            <div className="mb-3 mt-3 d-flex justify-content-center">
                                <img
                                    src={image}
                                    className="img-fluid rounded mb-3"
                                    style={{ maxHeight: "250px" }}
                                />
                            </div>
                        )}
                    </div>
                    {/* Body text */}
                    <div className="mb-3">
                        <label className="form-label">Body</label>
                        <textarea
                            className="form-control"
                            rows={4}
                            placeholder="Enter Body Here"
                            defaultValue={snippet.body}
                            onChange={(e) => setNewBody(e.target.value)}
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button
                            type="button"
                            onClick={handleDeletion}
                            className="btn btn-danger me-2 d-flex w-11"
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary d-flex  w-11"
                            onClick={handleEdit}
                        >
                            Update
                        </button>
                    </div>
                </form>
            </>
        );
    }
};

export default EditPost;
