import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!username || !email || !password) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("El correo electrónico no tiene un formato válido.");
            return;
        }
    
        try {
            const response = await fetch("https://automatic-eureka-4jw9rpwgq6j5hq954-3001.app.github.dev//registro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });
    
            if (response.ok) {
                const data = await response.json();
                alert(data.message); 
                navigate("/login"); 
            } else {
                const errorData = await response.json();
                setError(errorData.error);
            }
        } catch (err) {
            setError("Error al conectar con el servidor.");
        }
    };

    return (
        <div className="container mt-5">
            <h1>Register</h1>
            {error && <div className="alert alert-danger">{error}</div>}
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
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
    {isLoading ? "Registrando..." : "Register"}
</button>
            </form>
        </div>
    );
};