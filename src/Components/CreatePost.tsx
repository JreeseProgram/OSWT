import { useState } from "react";

const CreatePost = () => {
    {
        /* presents a value and function to update the value, and the use states give 
        the option to have image as a string or null, and then the() has the default 
        of the object (null) */
    }
    const [image, setImage] = useState<string | null>(null);
    {
        /*so basically this works as once an image is uploaded it triggers
            a change event, it scoops it up and is the event. Then it targets 
            that file that triggered it and makes a temporary URL for displaying it*/
    }
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <h1 className="text-center">Create a Post</h1>
            <form className="container py-5">
                {/* Title */}
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Title Here"
                        required
                    />
                </div>
                {/* Image */}
                <div className="mb-3">
                    <label className="form-label">
                        Upload Image {"(Optional)"}
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={handleImageUpload}
                    />
                    {image && (
                        <div className="mb-3 mt-3">
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
        </>
    );
};

export default CreatePost;
