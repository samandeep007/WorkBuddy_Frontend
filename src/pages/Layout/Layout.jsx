import React from "react";
import { Navbar, Footer } from "../../components";
import GoToTop from "../../components/GoToTop/GoToTop";
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <GoToTop/>
      <Footer />
    </>
  );
}
