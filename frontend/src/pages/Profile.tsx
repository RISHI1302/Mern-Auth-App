import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface ProfileData {
    name: string;
    email: string;
}

export default function Profile() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Get current profile
    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await api.get("/profile");

                const profile: ProfileData = response.data.profile;

                setName(profile.name);
                setEmail(profile.email);

            } catch (err: any) {
                if (err.response?.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                    return;
                }

                setError(
                    err.response?.data?.message ||
                    "Unable to load profile"
                );
            } finally {
                setLoading(false);
            }
        };

        getProfile();
    }, [navigate]);

    // Update profile
    const handleUpdate = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!name || !email) {
            setError("Name and email are required");
            return;
        }

        try {
            setUpdating(true);

            const response = await api.put("/profile", {
                name,
                email,
            });

            setSuccess(response.data.message);

        } catch (err: any) {
            if (err.response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

            setError(
                err.response?.data?.message ||
                "Unable to update profile"
            );
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">
                    Loading profile...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Profile
                </h1>

                {error && (
                    <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-4">
                        {success}
                    </div>
                )}

                <form
                    onSubmit={handleUpdate}
                    className="space-y-5"
                >

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={updating}
                        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400"
                    >
                        {updating
                            ? "Updating..."
                            : "Update Profile"}
                    </button>

                </form>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="w-full mt-4 border border-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-50"
                >
                    Back to Dashboard
                </button>

            </div>

        </div>
    );
}