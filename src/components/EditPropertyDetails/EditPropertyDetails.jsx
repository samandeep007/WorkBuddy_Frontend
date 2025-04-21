import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPropertyDetails = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState({
    title: "",
    address: "",
    propertyType: "Meeting Room",
    area: "",
    capacity: "",
    leaseTerm: "Hourly",
    price: "",
    hasParking: false,
    isAccessible: false,
    isAvailable: true,
    tags: [],
    images: [],
  });

  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tagInput, setTagInput] = useState(""); 

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.post(`http://localhost:3000/api/properties/view/${propertyId}`, {}, { withCredentials: true });
        setProperty(response.data.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching property details");
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProperty((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTagsChange = (e) => {
    setTagInput(e.target.value); 
  };

  const addTag = (e) => {
    if (e.key === " " && tagInput.trim() !== "") {
      setProperty((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setProperty((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };
  const handleImageChange = (e) => {
    setNewImages([...e.target.files]);
  };

  const validateForm = () => {
    const { area, capacity, price } = property;
    if (area <= 0 || capacity <= 0 || price <= 0) {
      toast.error("Area, Capacity, and Price must be greater than zero.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    Object.entries(property).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formData.append(key, value.join(", "));
      } else {
        formData.append(key, value);
      }
    });

    newImages.forEach((image) => formData.append("images", image));

    try {
      await axios.patch(`http://localhost:3000/api/properties/edit/${propertyId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating property", error);
      toast.error("Error updating property");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/properties/${propertyId}`, { withCredentials: true });
      navigate("/");
    } catch (error) {
      console.error("Error deleting property", error);
      toast.error("Error deleting property");
    }
  };

  const confirmDelete = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    handleDelete();
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center min-h-screen p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row bg-white rounded-lg overflow-hidden max-w-6xl w-full">
        {/* Left side: Property Images */}
        <div className="w-full lg:w-1/2 relative p-4">
          {property.images.length > 0 && (
            <div className="relative">
              <img
                src={property.images[currentImageIndex]}
                alt="Current Property"
                className="w-full h-80 object-cover rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
              />
              <div className="mt-4">
                <div className="flex overflow-x-auto space-x-2">
                  {property.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index}`}
                      className={`w-24 h-24 object-cover rounded-lg cursor-pointer transition-transform duration-300 transform hover:scale-110 ${index === currentImageIndex ? 'border-4 border-blue-500' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right side: Property Details */}
        <div className="w-full lg:w-1/2  p-4 lg:p-8 space-y-6">
          <h2 className="text-2xl lg:text-4xl font-bold mb-6 text-gray-800">Edit Property</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Fields */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={property.title}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={property.address}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Area (sq ft)</label>
                <input
                  type="number"
                  name="area"
                  value={property.area}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={property.capacity}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={property.price}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Property Type</label>
                <select
                  name="propertyType"
                  value={property.propertyType}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Meeting Room">Meeting Room</option>
                  <option value="Private Office Room">Private Office Room</option>
                  <option value="Desk">Desk</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2 text-gray-700">Lease Term</label>
                <select
                  name="leaseTerm"
                  value={property.leaseTerm}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Hourly">Hourly</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2 text-gray-700">Tags</label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={handleTagsChange}
                  onKeyDown={addTag}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Press Spacebar to add a tag"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {property.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-5 py-2 text-[14px] font-semibold text-gray-900"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                </div>
        
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2 text-gray-700">Images</label>
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="hasParking"
                  checked={property.hasParking}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-blue-500 focus:ring-blue-500"
                />
                <label className="ml-2 text-sm font-medium text-gray-700">Has Parking</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isAccessible"
                  checked={property.isAccessible}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-blue-500 focus:ring-blue-500"
                />
                <label className="ml-2 text-sm font-medium text-gray-700">Accessible</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={property.isAvailable}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-blue-500 focus:ring-blue-500"
                />
                <label className="ml-2 text-sm font-medium text-gray-700">Available</label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-700 text-white rounded-lg shadow-md hover:bg-red-900 transition-colors"
              >
                Delete Property
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-700 mb-4">Are you sure you want to delete this property? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default EditPropertyDetails;
