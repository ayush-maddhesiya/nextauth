"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            setButtonDisabled(true); // Disable button during signup
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            toast.success("Signup successful!");
            router.push("/login");
        } catch (error: any) {
            console.log("Signup failed", error.response?.data?.error || error.message);
            toast.error(error.response?.data?.error || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
            setButtonDisabled(false); // Re-enable button after signup
        }
    };

    useEffect(() => {
        const isFormFilled = user.email && user.password && user.username;
        setButtonDisabled(!isFormFilled);
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl mb-4">{loading ? "Processing..." : "Signup"}</h1>
            <hr className="w-full mb-4" />
            <label htmlFor="username">Username</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="Username"
                disabled={loading}
            />
            <label htmlFor="email">Email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
                disabled={loading}
            />
            <label htmlFor="password">Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
                disabled={loading}
            />
            <button
                onClick={onSignup}
                disabled={buttonDisabled}
                className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled ? "bg-gray-200" : "bg-blue-500 text-white"}`}
            >
                {loading ? "Signing up..." : "Signup"}
            </button>
            <Link href="/login" className="text-blue-500">Visit login page</Link>
        </div>
    );
}
