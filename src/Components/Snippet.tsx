import type { ReactNode } from "react";

interface Props {
    header: string;
    imgRef?: string;
    body: ReactNode;
}
const Snippet = ({ header, imgRef, body }: Props) => {
    //Style formatting is this way D/T JSX, one {} means JS, then {{}} means JS object, since it has 2 parts similar to json
    return (
        <div className="card" style={{ width: "18rem" }}>
            <h3>{header}</h3>
            {imgRef && <img src={imgRef} className="card-img"></img>}
            <div>{body}</div>
        </div>
    );
};

export default Snippet;
