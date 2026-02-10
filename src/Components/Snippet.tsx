import { useNavigate } from "react-router-dom";

interface Props {
    header: string;
    imgRef?: string;
    body: string;
    postID: number;
}

const Snippet = ({ header, imgRef, body, postID }: Props) => {
    const navigate = useNavigate();

    const handleFullscreen = () => {
        navigate(`/${postID}`, {
            state: { header, imgRef, body, postID },
        });
    };
    return (
        <div
            className="card"
            style={{
                aspectRatio: "1 / 1",
                width: "100%",
                //display: "flex",
                //flexDirection: "column",
                display: "block",
                overflow: "hidden",
                cursor: "pointer",
            }}
            onClick={handleFullscreen}
        >
            <h3
                className="text-center"
                style={{
                    margin: 0,
                    padding: "0.5rem",
                }}
            >
                {header}
            </h3>
            {imgRef && (
                <div
                    style={{
                        height: "50%",
                        overflow: "hidden",
                    }}
                >
                    <img
                        src={imgRef}
                        className="card-img-top"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
                        }}
                    />
                </div>
            )}
            <div
                style={{
                    padding: "0.5rem",
                    textAlign: "left",
                    overflow: "hidden",
                }}
            >
                <p>{body}</p>
            </div>
        </div>
    );
};

export default Snippet;
