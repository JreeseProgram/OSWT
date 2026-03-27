import { useState } from "react";
import { useUser } from "./UserContext";
import supabaseClient from "./supabaseClient";

const CreatePost = () => {
    const [header, setHeader] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [imageFile, setFile] = useState<File | null>(null);
    const [body, setBody] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const user = useUser();

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            setImage(URL.createObjectURL(file));
        }
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!user) {
            setSuccess(null);
            setError("Not Logged in");
            return;
        }

        //if there is an image, send it to the storage
        let img_ref: string | null = null;

        if (imageFile) {
            const filePath = `${user.id}/${crypto.randomUUID()}-${imageFile.name}`;
            const { error: uploadError } = await supabaseClient.storage
                .from("snippet_images")
                .upload(filePath, imageFile, {
                    cacheControl: "3600",
                    upsert: false,
                    contentType: imageFile.type,
                });

            if (uploadError) {
                setSuccess(null);
                setError(uploadError.message);
                return;
            }

            img_ref = filePath;
        }

        const { error } = await supabaseClient
            .from("Snippets")
            .insert({
                user_id: user.id,
                header: header,
                img: img_ref,
                body: body,
            })
            .select()
            .single();

        if (error) {
            setSuccess(null);
            setError(error.message);
            return;
        }

        setHeader("");
        setBody("");
        setImage(null);
        setFile(null);
        setError(null);
        setSuccess("Snippet has been successfully posted!");
    }

    return (
        <>
            <h1 className="text-center pt-3">Create a Post</h1>
            <form className="container py-5" onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Title Here"
                        value={header}
                        onChange={(e) => {
                            setHeader(e.target.value);
                        }}
                        required
                    />
                </div>
                {/* Image */}
                <div className="mb-3">
                    <label className="form-label">
                        Upload Image {"(Optional) (2MB Maximum)"}
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={handleImageUpload}
                    />
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
                        value={body}
                        onChange={(e) => {
                            setBody(e.target.value);
                        }}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary d-flex ms-auto w-11"
                >
                    Submit
                </button>
            </form>
            {error && <p className="alert alert-danger">{error}</p>}
            {success && <p className="alert alert-success">{success}</p>}
        </>
    );
};

export default CreatePost;
