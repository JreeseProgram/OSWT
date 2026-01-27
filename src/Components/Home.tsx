import Buttons from "./Buttons";
import Snippet from "./Snippet";

const Home = () => {
    return (
        <>
            <h1>Testing</h1>
            <Buttons
                text="Test button"
                color="primary"
                onClick={() => console.log("button clicked!")}
            ></Buttons>
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
        </>
    );
};

export default Home;
