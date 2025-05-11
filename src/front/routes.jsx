import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Perfil } from "./pages/Perfil"; 
import { EditarPerfil } from "./pages/EditarPerfil"; 

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/perfil"
        element={<Perfil backendUrl="https://automatic-eureka-4jw9rpwgq6j5hq954-3001.app.github.dev/perfil" />}
      />
      <Route
        path="/editar-perfil"
        element={<EditarPerfil backendUrl="https://automatic-eureka-4jw9rpwgq6j5hq4j-3001.app.github.dev/editar-perfil" />}
      />
    </Route>
  )
);