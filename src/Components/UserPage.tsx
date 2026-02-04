import Grid from "./Grid";
import Snippet from "./Snippet";

interface Props {
    username: string;
    profilePic: string;
}

const testSnippets = [
    <Snippet
        header="POST1"
        body={<p>I am normal text</p>}
        imgRef="https://placehold.co/400x300/png"
    />,
    <Snippet
        header="POST2"
        body={<p>I am normal text</p>}
        imgRef="https://placehold.co/200x150/png"
    />,
    <Snippet header="POST3" body={<p>I am normal text</p>} />,
    <Snippet
        header="POST4"
        body={<p>I am normal text</p>}
        imgRef="https://placehold.co/700x400/png"
    />,
    <Snippet header="POST5" body={<p>TEXTING TEXTER</p>} />,
    <Snippet
        header="POST6"
        body={<p>TEXTING TEXTER</p>}
        imgRef="https://placehold.co/300x300/png"
    />,
    <Snippet
        header="POST7"
        body={<p>TEXTING TEXTER</p>}
        imgRef="https://placehold.co/800x500/png"
    />,
];

const UserPage = ({ username, profilePic }: Props) => {
    return (
        <>
            <div className="d-flex align-items-center justify-content-center py-3 pb-4">
                <img src={profilePic} style={{ height: "60px" }}></img>
                <h1 className="ms-3">{username + "'s Page"}</h1>
            </div>
            <Grid snippets={testSnippets}></Grid>
        </>
    );
};

export default UserPage;
