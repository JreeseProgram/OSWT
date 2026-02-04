import type { ReactNode } from "react";

interface Props {
    header: string;
    imgRef?: string;
    body: ReactNode;
}
const Snippet = ({ header, imgRef, body }: Props) => {
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
            }}
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
                {body}
            </div>
        </div>
    );
};

export default Snippet;
