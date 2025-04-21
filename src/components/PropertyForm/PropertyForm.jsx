import React, { useState } from "react";
import axios from "axios";
import TagsInput from "../TagsInput/TagsInput";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PropertyForm = () => {
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
  });

  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProperty((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validation: Check if any required fields are empty
    const { title, address, area, capacity, price } = property;
    if (!title || !address || !area || !capacity || !price || images.length === 0) {
      toast.error("Please fill in all required fields and upload at least one image.");
      return;
    }
  
    const formData = new FormData();
    Object.entries(property).forEach(([key, value]) =>
      formData.append(key, value)
    );
    formData.append("tags", tags.join(", "));
    images.forEach((image) => formData.append("images", image));
  
    try {
      await axios.post("https://workbuddy-backend.onrender.com/api/properties/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      navigate("/");
      console.log("Property created successfully");
    } catch (error) {
      console.error("Error creating property", error);
      toast.error("Area, Capacity, and Price must be greater than zero. You must add at least one image in case you did not");
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src="../src/assets/space.jpg"
            alt="Property Image"
            className="object-cover w-full h-64 md:h-full"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-4 md:p-8">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-center">Add Property</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={property.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={property.address}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4">
              {[
                { label: "Area (sq ft)", name: "area", type: "number" },
                { label: "Capacity", name: "capacity", type: "number" },
                { label: "Price", name: "price", type: "number" },
              ].map(({ label, name, type }) => (
                <div key={name} className="flex-1 mb-4 md:mb-0">
                  <label className="block text-sm mb-2 font-medium">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={property[name]}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1 mb-4 md:mb-0">
                <label className="block text-sm mb-2 font-medium">Property Type</label>
                <select
                  name="propertyType"
                  value={property.propertyType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="Meeting Room">Meeting Room</option>
                  <option value="Private Office Room">Private Office Room</option>
                  <option value="Desk">Desk</option>
                </select>
              </div>

              <div className="flex-1 mb-4 md:mb-0">
                <label className="block text-sm mb-2 font-medium">Lease Term</label>
                <select
                  name="leaseTerm"
                  value={property.leaseTerm}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="Hourly">Hourly</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Tags</label>
              <TagsInput tags={tags} setTags={setTags} />
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4">
              {[
                { label: "Has Parking", name: "hasParking" },
                { label: "Is Accessible", name: "isAccessible" },
                { label: "Is Available", name: "isAvailable" },
              ].map(({ label, name }) => (
                <div key={name} className="flex items-center mb-4 md:mb-0">
                  <input
                    type="checkbox"
                    name={name}
                    checked={property[name]}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label className="text-sm font-medium">{label}</label>
                </div>
              ))}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Upload Images</label>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700"
            >
              Create Property
            </button>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>

  );
};

export default PropertyForm;
