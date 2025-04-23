import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000, // El puerto donde corre el frontend
        proxy: {
            '/registro': 'https://bug-free-trout-7vp4xjpr74q6hq4j-3001.app.github.dev/', // Redirige las solicitudes a /registro al backend
            '/login': 'https://bug-free-trout-7vp4xjpr74q6hq4j-3001.app.github.dev/', // Redirige las solicitudes a /login al backend
        },
    },
    build: {
        outDir: 'dist',
    },
});