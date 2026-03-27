import React, { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import supabaseClient from "./supabaseClient";

const UserProfile = () => {
    const [originalPassword, checkPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [pwdError, setPwdError] = useState<string | null>(null);

    const [currentUsername, setCurrentUsername] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [userError, setUserError] = useState<string | null>(null);

    const [newPfp, setNewPfp] = useState<File | null>(null);
    const [pfpError, setPfpError] = useState<string | null>(null);

    const [email, setEmail] = useState<string | undefined>("");
    const [newEmail, setNewEmail] = useState("");
    const [emailError, setEmailError] = useState<string | null>(null);

    const [update, setUpdate] = useState<boolean>(false);

    const user = useUser();

    //upon changes gets info
    useEffect(() => {
        setEmail(user?.email);
        setCurrentUsername(user?.user_metadata.display_name);
    }, [user, update]);

    const handleEmailUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(newEmail.trim())) {
            setEmailError("Email does not contain a valid Email");
            return;
        }

        await supabaseClient.auth.updateUser({
            email: newEmail,
        });

        alert("please check your new email to confirm");
        return;
    };

    const handlePasswordSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();

        if (password1 !== password2) {
            setPwdError("New Passwords must match");
            return;
        }

        //check original password for validity
        const emailForUse = user?.email;
        if (!emailForUse) {
            setPwdError("Error Retrieving Email");
            return;
        }
        const { error: ogPasswordError } =
            await supabaseClient.auth.signInWithPassword({
                email: emailForUse,
                password: originalPassword,
            });

        if (ogPasswordError) {
            setPwdError("Invalid Password");
            return;
        }

        //update new password
        const { error: updateError } = await supabaseClient.auth.updateUser({
            password: password2,
        });

        if (updateError) {
            setPwdError(updateError.message);
            return;
        }

        setPwdError(null);
        alert("Password Updated Successfully");
    };
    const handlePfpUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //check if user has a default pfp
        const { data: currentPfp } = await supabaseClient
            .from("Profiles")
            .select("profile_picture")
            .eq("id", user?.id)
            .single();

        if (user) {
            const path = user.id + "/" + newPfp?.name;
            //if not default pfp
            if (!(currentPfp?.profile_picture === "default.jpg")) {
                const { error: deleteError } = await supabaseClient.storage
                    .from("profile_pics")
                    .remove([currentPfp?.profile_picture]);

                if (deleteError) {
                    setPfpError(deleteError.message);
                    return;
                }
            }

            const { error: uploadError } = await supabaseClient.storage
                .from("profile_pics")
                .upload(path, newPfp);

            if (uploadError) {
                setPfpError(uploadError.message);
                return;
            }
            const { error: updateError } = await supabaseClient
                .from("Profiles")
                .update({ profile_picture: path })
                .eq("id", user.id);

            if (updateError) {
                setPfpError(updateError.message);
                return;
            }

            setPfpError(null);
            alert("Profile Picture has been updated");
            return;
        }
    };

    const [image, setImage] = useState<string | null>(null);
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewPfp(file);
            setImage(URL.createObjectURL(file));
        }
    };

    const handleUsernameUpdate = async (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();

        if (currentUsername === newUsername) {
            setUserError("Username is same as current");
            return;
        }

        //Search if username exists
        const { data } = await supabaseClient
            .from("Profiles")
            .select("username")
            .eq("username", newUsername)
            .single();

        if (data) {
            setUserError("Username is already Taken");
            return;
        }

        const { error: authUpdateError } = await supabaseClient.auth.updateUser(
            {
                data: {
                    display_name: newUsername,
                },
            },
        );

        if (authUpdateError) {
            setUserError(authUpdateError.message);
            return;
        }

        const { error: profileError } = await supabaseClient
            .from("Profiles")
            .update({ username: newUsername })
            .eq("id", user?.id);

        if (profileError) {
            setUserError(profileError.message);
            return;
        }

        setUserError(null);
        setUpdate(!update);
        alert("Username updated successfully");
    };

    return (
        <>
            <h1 className="text-center mt-3">User Profile</h1>
            {/*Username */}
            <form className="container py-3" onSubmit={handleUsernameUpdate}>
                <h4 className="text-center py-4">Username</h4>
                <label className="form-label">Update Username</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder={"Current Username: " + currentUsername}
                    onChange={(e) => {
                        setNewUsername(e.target.value);
                    }}
                    required
                />
                {userError && (
                    <div className="alert alert-danger py-3">{userError}</div>
                )}
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
                    type="password"
                    className="form-control"
                    placeholder="Enter Original Password"
                    onChange={(e) => checkPassword(e.target.value)}
                    required
                />
                <label className="form-label">Enter New Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter New Password"
                    onChange={(e) => setPassword1(e.target.value)}
                    required
                />
                <label className="form-label">Enter New Password Again</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter New Password"
                    onChange={(e) => setPassword2(e.target.value)}
                    required
                />
                {pwdError && (
                    <div className="alert alert-danger py-3">{pwdError}</div>
                )}
                <button
                    type="submit"
                    className="btn btn-primary d-block ms-auto mt-2"
                >
                    Update
                </button>
            </form>
            {/*Email */}
            <form className="container py-3" onSubmit={handleEmailUpdate}>
                <h4 className="text-center py-4">Email</h4>
                <label className="form-label">Update Email</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder={"Current Email: " + email}
                    onChange={(e) => {
                        setNewEmail(e.target.value);
                    }}
                    required
                />
                {emailError && (
                    <div className="alert alert-danger py-3">{emailError}</div>
                )}
                <button
                    type="submit"
                    className="btn btn-primary d-block ms-auto mt-2"
                >
                    Update
                </button>
            </form>
            {/*Profile Picture (If implemented) */}
            <form className="container py-3" onSubmit={handlePfpUpdate}>
                <h4 className="text-center py-4">Profile Picture</h4>
                <div className="mb-3">
                    <label className="form-label">
                        Upload Image {"(Max 1MB)"}
                    </label>
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
                {pfpError && (
                    <div className="alert alert-danger py-3">{pfpError}</div>
                )}
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
