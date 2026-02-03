import { useState } from "react";

interface Props {
    username: string;
    email: string;
}

const UserProfile = ({ username, email }: Props) => {
    //password update handling
    const [originalPassword, checkPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password1 !== password2) {
            setError("ERROR: Passwords must match");
            return;
        }
        //TODO: add password check for original
        if (originalPassword !== "") {
            setError("PLACEHOLDER BUT I SEE PASSWORD AS: " + originalPassword);
            return;
        }

        setError("");
        //TODO: add submission success
    };
    //Profile picture handling
    const [image, setImage] = useState<string | null>(null);
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <h1 className="text-center">User Profile</h1>
            {/*Username */}
            <form className="container py-3">
                <h4 className="text-center py-4">Username</h4>
                <label className="form-label">Update Username</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder={"Current Username: " + username}
                    required
                />
                <button
                    type="submit"
                    className="btn btn-primary d-block ms-auto mt-2"
                >
                    Update
                </button>
            </form>
            {/* Password */}
            {/* TODO: add complexity and requirements in real time */}
            <form onSubmit={handlePasswordSubmit} className="container py-1">
                <h4 className="text-center">Update Password</h4>
                <br />
                <label className="form-label">Enter Original Password</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Original Password"
                    onChange={(e) => checkPassword(e.target.value)}
                    required
                />
                <label className="form-label">Enter New Password</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter New Password"
                    onChange={(e) => setPassword1(e.target.value)}
                    required
                />
                <label className="form-label">Enter New Password Again</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter New Password"
                    onChange={(e) => setPassword2(e.target.value)}
                    required
                />
                {error && <div className="text-danger mb-3">{error}</div>}
                <button
                    type="submit"
                    className="btn btn-primary d-block ms-auto mt-2"
                >
                    Update
                </button>
            </form>
            {/*Email */}
            <form className="container py-3">
                <h4 className="text-center py-4">Email</h4>
                <label className="form-label">Update Email</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder={"Current Email: " + email}
                    required
                />
                <button
                    type="submit"
                    className="btn btn-primary d-block ms-auto mt-2"
                >
                    Update
                </button>
            </form>
            {/*Profile Picture (If implemented) */}
            <form className="container py-3">
                <h4 className="text-center py-4">Profile Picture</h4>
                <div className="mb-3">
                    <label className="form-label">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={handleImageUpload}
                        required
                    />
                    {image && (
                        <div className="mb-3 mt-3">
                            <img
                                src={image}
                                className="img-fluid rounded mb-3"
                                style={{ maxHeight: "250px" }}
                            />
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    className="btn btn-primary d-block ms-auto mt-2"
                >
                    Update
                </button>
            </form>
        </>
    );
};

export default UserProfile;
