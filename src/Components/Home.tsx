import Grid from "./Grid";
import { testData } from "./TestData";

const Home = () => {
    return (
        <>
            <h1 className="text-center pt-3 pb-2">Home</h1>
            {/**TODO: once backend is in, replace testdata */}
            <Grid snippets={testData} />
        </>
    );
};

export default Home;
