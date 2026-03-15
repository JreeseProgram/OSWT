//import Grid from "./Grid";
//import Snippet from "./Snippet";

interface Props {
    username: string;
    profilePic: string;
}

const UserPage = ({ username, profilePic }: Props) => {
    return (
        <>
            <div className="d-flex align-items-center justify-content-center py-3 pb-4">
                <img src={profilePic} style={{ height: "60px" }}></img>
                <h1 className="ms-3">{username + "'s Page"}</h1>
            </div>
            <h1>TEMPORARILY BROKEN, ADDING FUNCTIONALITY SOON</h1>
            {/*<Grid snippets={testSnippets}></Grid>*/}
        </>
    );
};

export default UserPage;
