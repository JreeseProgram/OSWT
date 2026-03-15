import { useState } from "react";
//import { useParams } from "react-router-dom";

const EditPost = () => {
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

    //const { postID } = useParams();

    const handleDeletion = () => {
        //TODO: backend deletion
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    // const loadedPostData = testData
    //     .map((snippet) => snippet.props)
    //     .find((p) => Number(p.postID) === Number(postID));

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
                        required
                    >
                        {/*loadedPostData.header*/}
                    </input>
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
                    {/*loadedPostData.imgRef && image == null && (
                        <div className="mb-3 mt-3 d-flex justify-content-center">
                            <img
                                src={loadedPostData.imgRef}
                                className="img-fluid rounded mb-3"
                                style={{ maxHeight: "250px" }}
                            />
                        </div>
                    )*/}
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
                        required
                    >
                        {/*loadedPostData.body*/}
                    </textarea>
                </div>
                <div className="d-flex justify-content-end">
                    <button
                        onClick={handleDeletion}
                        className="btn btn-danger me-2 d-flex w-11"
                    >
                        Delete
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary d-flex  w-11"
                    >
                        Update
                    </button>
                </div>
            </form>
        </>
    );
};

export default EditPost;
