import { useEffect, useState } from "react";

export const Perfil = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPerfil = async () => {
            try {
                const response = await fetch("https://bug-free-trout-7vp4xjpr74q6hq4j-3001.app.github.dev/perfil", {
                    method: "GET",
                    credentials: "include", // Para incluir cookies de sesión
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    const errorData = await response.json();
                    setError(errorData.error || "Error al obtener el perfil.");
                }
            } catch (err) {
                setError("Error al conectar con el servidor.");
            }
        };

        fetchPerfil();
    }, []);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!user) {
        return <p>Cargando perfil...</p>;
    }

    return (
        <div>
            <h1>Perfil de Usuario</h1>
            <p><strong>Nombre de usuario:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
        </div>
    );
};