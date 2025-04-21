import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import UserLayout from "../UserLayout/UserLayout";

const ProtectedRoute = ({ element: Element }) => {
  const { user } = useAuth(); // Get the user from auth context or hook

  if (!user || !user.isOwner) {
    return <Navigate to="/" />;
  }

  return <UserLayout><Element /></UserLayout>;
};

export default ProtectedRoute;
