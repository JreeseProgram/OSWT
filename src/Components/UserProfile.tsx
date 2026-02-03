interface Props {
    username: string;
    email: string;
}

const UserProfile = ({ username, email }: Props) => {
    return (
        <>
            <h1>User Profile</h1>
            {/*Email */}
            <form className="container py-5">
                <label className="form-label">Username</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder={username}
                />
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </>
    );
};

export default UserProfile;
