import { Link } from "react-router-dom";

const ConfirmSignUp = () => {
    return (
        <>
            <h1 className="text-center pt-3">Welcome!</h1>
            <h3>
                Please click <Link to="/">Here</Link> to go to the Home!
            </h3>
        </>
    );
};

export default ConfirmSignUp;
