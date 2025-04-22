// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Login } from "./pages/Login"; // Import Login page
import { Register } from "./pages/Register"; // Import Register page

export const router = createBrowserRouter(
  createRoutesFromElements(
      // Root Route: All navigation will start from here.
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

          {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
          <Route path="/" element={<Home />} />
          <Route path="/single/:theId" element={<Single />} /> {/* Dynamic route for single items */}
          <Route path="/demo" element={<Demo />} />
          <Route path="/login" element={<Login />} /> {/* Login route */}
          <Route path="/register" element={<Register />} /> {/* Register route */}
      </Route>
  )
);