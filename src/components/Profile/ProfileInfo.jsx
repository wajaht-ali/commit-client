import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchUserProfile, updateUserProfile } from "../../utils/api";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";

const ProfileInfo = () => {
    const { user: authUser } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        headline: "",
        avatar: "",
        socialLinks: {
            github: "",
            linkedin: "",
        },
    });
    const [avatarPreview, setAvatarPreview] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        const loadUserProfile = async () => {

            if (!authUser?.userData?._id && !authUser?.userData?.id) {
                setLoading(false);
                return;
            }

            try {
                const userId = authUser.userData._id || authUser.userData.id;
                const userData = await fetchUserProfile(userId);
                setUser(userData);
                const socialLinks = userData.socialLinks;
                const socialLinksObj = socialLinks instanceof Map
                    ? {
                        github: socialLinks.get("github") || "",
                        linkedin: socialLinks.get("linkedin") || "",
                    }
                    : socialLinks || { github: "", linkedin: "" };

                const avatar = userData.avatar || "";

                setFormData({
                    name: userData.name || "",
                    headline: userData.headline || "",
                    avatar,
                    socialLinks: socialLinksObj,
                });
                setAvatarPreview(avatar);
            } catch (error) {
                console.error("Error loading user profile:", error);
                toast.error(error.message || "Failed to load profile");
            } finally {
                setLoading(false);
            }
        };
        loadUserProfile();
    }, [authUser]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("socialLinks.")) {
            const key = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                socialLinks: {
                    ...prev.socialLinks,
                    [key]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleAvatarButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const maxSizeInMB = 2;
        if (file.size > maxSizeInMB * 1024 * 1024) {
            toast.error(`Image must be smaller than ${maxSizeInMB}MB`);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result;
            if (typeof result === "string") {
                setAvatarPreview(result);
                setFormData((prev) => ({
                    ...prev,
                    avatar: result,
                }));
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        if (!user) return;

        try {
            const userId = user._id || user.id;
            const updateData = {
                name: formData.name.trim(),
                headline: formData.headline.trim(),
                // avatar: formData.avatar || "",
                socialLinks: formData.socialLinks,
            };

            const updatedUser = await updateUserProfile(userId, updateData);
            setUser(updatedUser);
            setIsEditMode(false);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error(error.message || "Failed to update profile");
        }
    };

    const handleCancel = () => {
        if (!user) return;

        const socialLinks = user.socialLinks;
        const socialLinksObj = socialLinks instanceof Map
            ? {
                github: socialLinks.get("github") || "",
                linkedin: socialLinks.get("linkedin") || "",
            }
            : socialLinks || { github: "", linkedin: "" };

        setFormData({
            name: user.name || "",
            headline: user.headline || "",
            avatar: user.avatar || "",
            socialLinks: socialLinksObj,
        });
        setAvatarPreview(user.avatar || "");
        setIsEditMode(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-900 text-white">
                <div className="text-xl">Loading profile...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-900 text-white">
                <div className="text-xl">User not found</div>
            </div>
        );
    }

    const displayName = user.name || "User";
    const displayHeadline = user.headline || "-";
    const displayAvatar =
        avatarPreview || user.avatar || <FaUser />
    const socialLinks = user.socialLinks instanceof Map
        ? {
            github: user.socialLinks.get("github") || "",
            linkedin: user.socialLinks.get("linkedin") || "",
        }
        : user.socialLinks || { github: "", linkedin: "" };

    return (
        <div className="max-w-7xl mx-auto w-full space-y-4 lg:space-y-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">My Profile</h1>

            {/* Profile Header Card */}
            <section className="bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-4 border-sky-500 shrink-0 group">
                        <img
                            src={displayAvatar}
                            alt="Profile"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {isEditMode && (
                            <button
                                type="button"
                                onClick={handleAvatarButtonClick}
                                className="absolute inset-0 bg-black/60 flex items-center justify-center text-xs sm:text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                Change
                            </button>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1 sm:space-y-2">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold truncate">{displayName}</h2>
                        <p className="text-sm sm:text-base text-gray-300 break-words">{displayHeadline}</p>
                    </div>
                </div>
            </section>

            {/* Personal Information Card */}
            <section className="bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg">
                <div className="w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <h3 className="text-lg sm:text-xl font-semibold">
                            Personal Information
                        </h3>
                        {!isEditMode ? (
                            <button
                                onClick={() => setIsEditMode(true)}
                                className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 font-semibold text-white bg-gradient-to-r from-sky-400 to-sky-600 rounded-lg hover:from-sky-500 hover:to-sky-700 transition-all duration-300 shadow-lg shadow-sky-500/20 active:scale-95"
                            >
                                Edit
                            </button>
                        ) : (
                            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                                <button
                                    onClick={handleSave}
                                    className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-2 font-semibold text-white bg-gradient-to-r from-green-400 to-green-600 rounded-lg hover:from-green-500 hover:to-green-700 transition-all duration-300 shadow-lg shadow-green-500/20 active:scale-95"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-2 font-semibold text-white bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg hover:from-gray-500 hover:to-gray-700 transition-all duration-300 shadow-lg shadow-gray-500/20 active:scale-95"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                    <hr className="border-t border-gray-700 mb-4 sm:mb-6" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                            <h4 className="text-sm sm:text-base font-semibold text-gray-300">Name</h4>
                            {isEditMode ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2.5 sm:p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm sm:text-base"
                                    placeholder="Enter your name"
                                />
                            ) : (
                                <p className="text-sm sm:text-base text-gray-200 break-words">{user.name || "-"}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-sm sm:text-base font-semibold text-gray-300">Headline</h4>
                            {isEditMode ? (
                                <input
                                    type="text"
                                    name="headline"
                                    value={formData.headline}
                                    onChange={handleInputChange}
                                    className="w-full p-2.5 sm:p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm sm:text-base"
                                    placeholder="Enter your headline"
                                />
                            ) : (
                                <p className="text-sm sm:text-base text-gray-200 break-words">{user.headline || "-"}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-sm sm:text-base font-semibold text-gray-300">GitHub</h4>
                            {isEditMode ? (
                                <input
                                    type="url"
                                    name="socialLinks.github"
                                    value={formData.socialLinks.github}
                                    onChange={handleInputChange}
                                    placeholder="https://www.github.com/username"
                                    className="w-full p-2.5 sm:p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm sm:text-base"
                                />
                            ) : (
                                <p className="text-sm sm:text-base text-gray-200 break-words">
                                    {socialLinks.github || "-"}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-sm sm:text-base font-semibold text-gray-300">LinkedIn</h4>
                            {isEditMode ? (
                                <input
                                    type="url"
                                    name="socialLinks.linkedin"
                                    value={formData.socialLinks.linkedin}
                                    onChange={handleInputChange}
                                    placeholder="https://www.linkedin.com/in/username"
                                    className="w-full p-2.5 sm:p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm sm:text-base"
                                />
                            ) : (
                                <p className="text-sm sm:text-base text-gray-200 break-words">
                                    {socialLinks.linkedin || "-"}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-sm sm:text-base font-semibold text-gray-300">Email</h4>
                            <p className="text-sm sm:text-base text-gray-200 break-words">{user.email || "-"}</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-sm sm:text-base font-semibold text-gray-300">Username</h4>
                            <p className="text-sm sm:text-base text-gray-200 break-words">{user.userName || "-"}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProfileInfo;
