import Grid from "./Grid";
import Snippet from "./Snippet";

interface Props {
    username: string;
    profilePic: string;
}

const testSnippets = [
    <Snippet
        header="POST1"
        body="I am normal text"
        imgRef="https://placehold.co/400x300/png"
        postID={1}
    />,
    <Snippet
        header="POST2"
        body="I am normal text"
        imgRef="https://placehold.co/200x150/png"
        postID={2}
    />,
    <Snippet header="POST3" body="I am normal text" postID={3} />,
    <Snippet
        header="POST4"
        body="I am normal text"
        imgRef="https://placehold.co/700x400/png"
        postID={4}
    />,
    <Snippet header="POST5" body="TEXTING TEXTER" postID={5} />,
    <Snippet
        header="POST6"
        body="TEXTING TEXTER"
        imgRef="https://placehold.co/300x300/png"
        postID={6}
    />,
    <Snippet
        header="POST7"
        body="BEHOLD I AM SUPER LONG TEXT AHHAHAHHAHAHAHAHHAH BEHOLD I AM SUPER LONG TEXT AHHAHAHHAHAHAHAHHAH BEHOLD I AM SUPER LONG TEXT AHHAHAHHAHAHAHAHHAH BEHOLD I AM SUPER LONG TEXT AHHAHAHHAHAHAHAHHAH BEHOLD I AM SUPER LONG TEXT AHHAHAHHAHAHAHAHHAH BEHOLD I AM SUPER LONG TEXT AHHAHAHHAHAHAHAHHAH BEHOLD I AM SUPER LONG TEXT AHHAHAHHAHAHAHAHHAH BEHOLD I AM SUPER LONG TEXT AHHAHAHHAHAHAHAHHAH BEHOLD I AM SUPER LONG TEXT AHHAHAHHAHAHAHAHHAH BEHOLD I AM SUPER LONG TEXT AHHAHAHHAHAHAHAHHAH BEHOLD I AM SUPER LONG TEXT AHHAHAHHAHAHAHAHHAH BEHOLD I AM SUPER LONG TEXT AHHAHAHHAHAHAHAHHAH BEHOLD I AM SUPER LONG TEXT AHHAHAHHAHAHAHAHHAH "
        imgRef="https://placehold.co/800x500/png"
        postID={7}
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
