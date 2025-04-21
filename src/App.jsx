import React from "react";
import { Outlet } from "react-router-dom"; // For nested routing
import Layout from "./pages/Layout/Layout.jsx";
import AuthProvider from "./context/AuthProvider.jsx";

export default function App() {
  return (
    <>
      <AuthProvider> {/* Wrap the app with AuthProvider for authentication context */}
        <Layout> {/* Apply consistent layout to all pages */}
          <Outlet /> {/* Render the matched child route */}
        </Layout>
      </AuthProvider>
    </>
  );
}