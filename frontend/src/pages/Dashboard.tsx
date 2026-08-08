import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

interface Profile {
    name: string;
    email: string;
}

export default function Dashboard() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await api.get("/profile");

                setProfile(response.data.profile);
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

    const handleLogout = async () => {
        try {
            await api.post("/logout");
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            localStorage.removeItem("token");
            navigate("/login");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Loading dashboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">

            <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">
                    Auth App
                </h1>

                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                    Logout
                </button>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-10">

                <div className="bg-white rounded-xl shadow-md p-8">

                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Welcome, {profile?.name}!
                    </h2>

                    <p className="text-gray-500 mb-8">
                        You are successfully logged in.
                    </p>

                    <div className="bg-gray-50 rounded-lg p-5 mb-6">
                        <h3 className="font-semibold text-gray-700 mb-2">
                            Account Information
                        </h3>

                        <p className="text-gray-600">
                            Email: {profile?.email}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">

                        <Link
                            to="/profile"
                            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700"
                        >
                            Profile
                        </Link>

                        <Link
                            to="/change-password"
                            className="bg-gray-800 text-white px-5 py-2.5 rounded-lg hover:bg-gray-900"
                        >
                            Change Password
                        </Link>

                    </div>

                </div>

            </main>

        </div>
    );
}