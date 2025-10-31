// __define-ocg__
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import authService from "../appwrite/auth";
import { useNavigate } from "react-router-dom";

function LoginComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handles user login and authentication flow
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // Authenticate user credentials
            await authService.login({ email, password });

            // Retrieve authenticated user details
            const userData = await authService.getCurrentUser();

            if (userData) {
                // Update global state with logged-in user data
                dispatch(login({ userData }));

                // Redirect to home page post-login
                navigate("/");
            } else {
                setError("Unable to fetch user details after login.");
            }
        } catch (err) {
            console.error("Login failed:", err);
            setError("Invalid email or password");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="border p-2 w-full mb-4"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="border p-2 w-full mb-4"
                    required
                />
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginComponent;
