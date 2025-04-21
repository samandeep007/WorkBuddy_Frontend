import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setIsOwner } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://workbuddy-backend.onrender.com/api/auth/login",
        { identifier, password },
        { withCredentials: true }
      );
      setUser(response.data.loggedInUser);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <section className="min-h-screen flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-2 flex-1">
        {/* Left Section: Image and Text */}
        <div className="relative flex flex-col justify-end px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-8 lg:py-12">
          <div className="absolute inset-0 aspect-[16/9] sm:aspect-auto">
            <img
              className="h-full w-full rounded-md object-cover object-top"
              src="./assets/HeroBackground.jpg"
              alt="Modern workspace with desks and computers"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="relative max-w-xl mx-auto sm:max-w-2xl lg:max-w-full">
            <h3 className="text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl">
              Welcome Back! Sign in to find your ideal workspace
            </h3>
            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                "Best Rated",
                "Verified Listings",
                "100+ Workspaces",
                "Flexible Lease Terms",
              ].map((item) => (
                <li key={item} className="flex items-center space-x-3">
                  <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-white sm:text-base md:text-lg">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section: Login Form */}
        <div className="flex items-center justify-center px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-8 lg:py-12">
          <div className="w-full max-w-sm sm:max-w-md">
            <h2 className="text-xl font-bold text-black sm:text-2xl md:text-3xl">
              Sign in
            </h2>
            <p className="mt-2 text-xs text-gray-600 sm:text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Create a free account
              </Link>
            </p>
            <form className="mt-6 space-y-4 sm:space-y-5">
              <div>
                <label
                  htmlFor="identifier"
                  className="text-sm font-medium text-gray-900 sm:text-base"
                >
                  Email address / Username
                </label>
                <div className="mt-1">
                  <input
                    id="identifier"
                    className="h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
                    type="text"
                    placeholder="Email or Username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-900 sm:text-base"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    className="h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-black/80 sm:text-base"
                  onClick={handleSubmit}
                >
                  Login <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
