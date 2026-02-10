import { useLocation, useNavigate, useParams } from "react-router-dom";

const PostPage = () => {
    const { postID } = useParams();
    const { state } = useLocation();
    console.log(state);

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <>
            <div
                style={{
                    background: "rgba(0,0,0,0.1)",
                    minHeight: "100vh",
                }}
            >
                <div
                    className="pt-5 container d-flex justify-content-center h-100"
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
                        {state.imgRef && (
                            <img
                                src={state.imgRef}
                                className="img-fluid d-block mx-auto my-3 pb-3"
                                style={{
                                    width: "640px",
                                    minWidth: "640px",
                                    aspectRatio: "16/9",
                                    objectFit: "cover",
                                }}
                            />
                        )}
                        <p className="text-center">{state.body}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostPage;
