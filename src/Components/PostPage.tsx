import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { testData } from "./TestData";
import GotoTop from "./GotoTop";
import { useState } from "react";

const PostPage = () => {
    const { postID } = useParams();
    const { state } = useLocation();
    console.log(state);

    const [liked, setLiked] = useState(state.isLiked);
    const btnClassname = liked
        ? "thumbs-up-fill d-flex flex-column mt-auto"
        : "thumbs-up-hollow d-flex flex-column mt-auto";

    const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setLiked(!liked);
        //TODO: Add like functionlity with backend
    };
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
                                        src={state.imgRef}
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
                            <div className="d-flex justify-content-end mt-auto">
                                <button
                                    onClick={handleLikeClick}
                                    className={btnClassname}
                                ></button>
                            </div>
                            <p className="text-center">{state.body}</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    {
        /*TODO: update once backend is in place to load posts from backend */
    }
    console.log(
        "props:",
        testData.map((p) => p.props),
    );
    const loadedPostData = testData
        .map((snippet) => snippet.props)
        .find((p) => Number(p.postID) === Number(postID));

    if (!loadedPostData) {
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
                            {loadedPostData.header}
                        </h1>
                        <div>
                            {loadedPostData.imgRef && (
                                <img
                                    src={loadedPostData.imgRef}
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
                        <div className="d-flex justify-content-end mt-auto">
                            <button
                                onClick={handleLikeClick}
                                className={btnClassname}
                            ></button>
                        </div>
                        <p className="text-center">{loadedPostData.body}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostPage;
