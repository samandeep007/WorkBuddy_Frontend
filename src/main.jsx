import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Register, Login, PropertyForm, EditPropertyDetails, PropertyDetails, Settings } from "./components/index.js";
import Home from "./pages/Home/Home.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute.jsx";
import OwnerRoute from "./pages/OwnerRoute/OwnerRoute.jsx";

// Create router configuration
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} /> {/* Home page */}
      <Route
        path="register"
        element={<ProtectedRoute element={Register} redirectIfAuthenticated />} // Registration page, protected and redirects if authenticated
      />
      <Route
        path="login"
        element={<ProtectedRoute element={Login} redirectIfAuthenticated />} // Login page, protected and redirects if authenticated
      />

      <Route
        path="addProperty"
        element={<OwnerRoute element={PropertyForm} />} // Add property page, only accessible by owners
      />

      <Route
        path="/property/edit/:propertyId"
        element={<OwnerRoute element={EditPropertyDetails} />} // Edit property page, only accessible by owners
      />

      <Route
        path="/property/:propertyId"
        element={<ProtectedRoute element={PropertyDetails} />} // Property details page, protected route
      />

      <Route
        path="/update-user"
        element={<ProtectedRoute element={Settings} />} // User settings page, protected route
      />
    </Route>
  )
);

// Render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);