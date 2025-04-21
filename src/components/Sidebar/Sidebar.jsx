import React from "react";
import { BarChart, Wrench, Home } from "lucide-react";
import { useAuth } from "../../context/AuthProvider";
import { NavLink } from "react-router-dom";

export function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="flex h-full sm:w-20 md:w-64  flex-col overflow-y-auto border-r border-gray-800 bg-black shadow-xl shadow-gray-900 px-5 py-8">
      <div className="flex items-center justify-center flex-col gap-3">
        <img
          src={user.avatar}
          className="rounded-full w-28 h-28 md:w-20 lg:w-28 hidden md:block border-2 border-gray-700"
          alt="User Avatar"
        />
        <h1 className="font-semibold text-lg text-white hidden md:block">{user.fullName}</h1>
        <h1 className="font-semibold text-md text-gray-400 hidden md:block">
          @{user.username}
        </h1>
      </div>
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6">
          <div className="space-y-3">
            <label className="px-3 text-xs font-semibold uppercase text-gray-300 hidden md:block">
              Analytics
            </label>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center rounded-lg px-3 py-2 text-gray-300 transition-colors duration-300 ${
                  isActive ? "bg-gray-800 text-white" : "hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <BarChart className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium hidden md:block">Dashboard</span>
            </NavLink>
            {user.isOwner && (
              <NavLink
                to="/addProperty"
                className={({ isActive }) =>
                  `flex items-center rounded-lg px-3 py-2 text-gray-300 transition-colors duration-300 ${
                    isActive ? "bg-gray-800 text-white" : "hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                <Home className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium hidden md:block">Add Property</span>
              </NavLink>
            )}
          </div>

          <div className="space-y-3">
            <label className="px-3 text-xs font-semibold uppercase text-gray-300 hidden md:block">
              Customization
            </label>
            <NavLink
              to="/update-user"
              className={({ isActive }) =>
                `flex items-center rounded-lg px-3 py-2 text-gray-300 transition-colors duration-300 ${
                  isActive ? "bg-gray-800 text-white" : "hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <Wrench className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium hidden md:block">Settings</span>
            </NavLink>
          </div>
        </nav>
      </div>
    </aside>
  );
}
