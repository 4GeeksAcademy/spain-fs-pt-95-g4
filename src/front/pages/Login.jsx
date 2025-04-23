import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const BASE_URL = "https://bug-free-trout-7vp4xjpr74q6hq4j-3001.app.github.dev";

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", 
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message); 
                setUsername(""); 
                setPassword(""); 
                navigate("/"); 
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Error al iniciar sesión.");
            }
        } catch (err) {
            setError(err.message || "Error al conectar con el servidor.");
        }
    };

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setError(null)}
                    ></button>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};