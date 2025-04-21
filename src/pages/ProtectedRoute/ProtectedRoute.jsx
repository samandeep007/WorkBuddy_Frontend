import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import UserLayout from "../UserLayout/UserLayout";

const ProtectedRoute = ({ element: Element, redirectIfAuthenticated }) => {
  const { user } = useAuth(); // Get the user from auth context or hook

  if (redirectIfAuthenticated && user) {
    return <Navigate to="/" />;
  }

  if (!user && !redirectIfAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Element />;
};

export default ProtectedRoute;
