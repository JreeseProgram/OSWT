import Grid from "./Grid";
import Snippet from "./Snippet";
//this is currently used only for testing
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

const Home = () => {
    return (
        <>
            <h1 className="text-center">Home</h1>
            <Grid snippets={testSnippets}></Grid>
        </>
    );
};

export default Home;

/**
 * template
 <Snippet
                header="Placeholder Header"
                body={<p>I am a body text :^D</p>}
                imgRef="https://placehold.co/400x300/png"
            />
            <br></br>
            <Snippet
                header="I shouldnt have image"
                body={<p>I dont got no image</p>}
            />
 */
