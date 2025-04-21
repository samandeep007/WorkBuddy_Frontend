import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import axios from 'axios';

export default function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('https://workbuddy-backend.onrender.com/api/auth/logout', {}, { withCredentials: true });
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="relative w-full bg-black text-white">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <Link to="/">
            <span className="font-semibold text-2xl">WorkBuddy</span>
          </Link>
        </div>
        
        <div className="hidden space-x-2 lg:flex">
          {!user ? (
            <>
              <Link to="/register">
                <button
                  type="button"
                  className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Sign up
                </button>
              </Link>
              <Link to="/login">
                <button
                  type="button"
                  className="rounded-md border border-white px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Log In
                </button>
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="h-10 w-10 rounded-full border-2 border-white"
              />
              <button
                onClick={handleLogout}
                className="rounded-md border border-white px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Log Out
              </button>
            </div>
          )}
        </div>

        <div className="lg:hidden">
          
      {  user ? <div className="flex items-center space-x-4">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="h-10 w-10 rounded-full border-2 border-white"
              />
              <button
                onClick={handleLogout}
                className="rounded-md border border-white px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Log Out
              </button>
            </div> :   <>
              <Link to="/register">
                <button
                  type="button"
                  className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Sign up
                </button>
              </Link>
              <Link to="/login">
                <button
                  type="button"
                  className="rounded-md border border-white px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Log In
                </button>
              </Link>
            </> }
            </div>
      </div>
    </div>
  );
}
