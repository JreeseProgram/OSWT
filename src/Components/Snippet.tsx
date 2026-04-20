import { useNavigate } from "react-router-dom";
import supabaseClient from "./supabaseClient";

interface Props {
    postID: number;
    userID: string;
    header: string;
    imgRef?: string;
    body: string;
}

const Snippet = ({ header, imgRef, body, postID }: Props) => {
    const navigate = useNavigate();

    const handleFullscreen = () => {
        navigate(`/${postID}`);
    };
    function getImageUrl(path: string) {
        const { data } = supabaseClient.storage
            .from("snippet_images")
            .getPublicUrl(path);

        return data.publicUrl;
    }

    return (
        <div
            className="card"
            style={{
                aspectRatio: "1 / 1",
                width: "100%",
                display: "block",
                overflow: "hidden",
                cursor: "pointer",
            }}
            onClick={handleFullscreen}
        >
            <h4>{}</h4>
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
                        src={getImageUrl(imgRef)}
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
