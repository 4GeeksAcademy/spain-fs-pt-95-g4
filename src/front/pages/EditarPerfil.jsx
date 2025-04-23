import { useState } from "react";

export const EditarPerfil = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://bug-free-trout-7vp4xjpr74q6hq4j-3001.app.github.dev/perfil", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username, email }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Error al actualizar el perfil.");
            }
        } catch (err) {
            setError("Error al conectar con el servidor.");
        }
    };

    return (
        <div>
            <h1>Editar Perfil</h1>
            {message && <p>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de usuario:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nuevo nombre de usuario"
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nuevo email"
                    />
                </div>
                <button type="submit">Guardar cambios</button>
            </form>
        </div>
    );
};