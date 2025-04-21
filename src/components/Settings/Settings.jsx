import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Lock, Key, User } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import UserLayout from '../../pages/UserLayout/UserLayout.jsx';
import { useAuth } from '../../context/AuthProvider.jsx';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('details');
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user.fullName || '',
    username: user.username || '',
    avatar: null, // Start with null, no pre-set avatar
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle form field changes for user details
  const handleDetailsChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  // Handle form submission for user details
  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append('fullName', formData.fullName);
    form.append('username', formData.username);
    // Only append avatar if it exists
    if (formData.avatar) {
      form.append('avatar', formData.avatar);
    }

    try {
      const response = await axios.post('https://workbuddy-backend.onrender.com/api/auth/update-user', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      toast.success("User details updated successfully");
      navigate("/");
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for changing password
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('https://workbuddy-backend.onrender.com/api/auth/change-password', {
        currentPassword,
        newPassword,
      }, { withCredentials: true });

      toast.success('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Wrong Password. Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserLayout>
      <div className="container max-w-3xl mx-auto min-h-screen">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">User Settings</h2>
        <div className="flex mb-8 border-b border-gray-300">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-6 py-3 font-medium rounded-t-md transition-colors ${
              activeTab === 'details' ? 'bg-black text-white border-b-2 border-black' : 'bg-gray-200 text-gray-700'
            }`}
          >
            <User size={20} className="mr-2" /> Update Details
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`px-6 py-3 font-medium rounded-t-md transition-colors ${
              activeTab === 'password' ? 'bg-black text-white border-b-2 border-black' : 'bg-gray-200 text-gray-700'
            }`}
          >
            <Key size={20} className="mr-2" /> Change Password
          </button>
        </div>
        {activeTab === 'details' && (
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Update User Details</h3>
            <form onSubmit={handleDetailsSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleDetailsChange}
                  className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                  required
                />
              </div>

              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleDetailsChange}
                  className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                  required
                />
              </div>

              {/* Avatar */}
              <div>
                <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  onChange={handleDetailsChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 focus:ring-2 focus:ring-black transition duration-300"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Details'}
              </button>
            </form>
          </div>
        )}
        {activeTab === 'password' && (
          <div className="bg-white shadow-lg rounded-lg p-8 mt-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Change Password</h3>
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <span className="p-3 bg-gray-200 text-gray-600">
                  <Lock size={24} />
                </span>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current Password"
                  className="w-full p-4 border-0 focus:outline-none focus:ring-black"
                  required
                />
              </div>

              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <span className="p-3 bg-gray-200 text-gray-600">
                  <Key size={24} />
                </span>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  className="w-full p-4 border-0 focus:outline-none focus:ring-black"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 focus:ring-2 focus:ring-black transition duration-300"
              >
                {loading ? 'Changing...' : 'Change Password'}
              </button>
            </form>
          </div>
        )}
      </div>
      <ToastContainer/>
    </UserLayout>
  );
};

export default Settings;
