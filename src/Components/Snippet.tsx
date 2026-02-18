import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    header: string;
    imgRef?: string;
    body: string;
    postID: number;
    isLiked?: boolean;
}

const Snippet = ({ header, imgRef, body, postID, isLiked = false }: Props) => {
    const navigate = useNavigate();

    const [liked, setLiked] = useState(isLiked);
    const btnClassname = liked
        ? "thumbs-up-fill d-flex flex-column ms-auto mt-auto"
        : "thumbs-up-hollow d-flex flex-column ms-auto mt-auto";
    const handleFullscreen = () => {
        navigate(`/${postID}`, {
            state: { header, imgRef, body, postID, isLiked: liked },
        });
    };

    const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setLiked(!liked);
        //TODO: Add like functionlity with backend
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
            <div
                className=""
                style={{ position: "absolute", bottom: 0, right: 0 }}
            >
                <button onClick={handleLikeClick} className={btnClassname} />
            </div>
        </div>
    );
};

export default Snippet;
