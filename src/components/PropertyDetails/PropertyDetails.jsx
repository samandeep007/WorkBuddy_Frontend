import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import UserLayout from "../../pages/UserLayout/UserLayout";
import { CheckCircle, MapPin, Tag, DollarSign, Calendar, User, Mail, Phone } from "lucide-react";
import { DetailsSkeleton } from "../Skeleton/Skeleton";

const PropertyDetails = () => {
  const { propertyId } = useParams();
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
    owner: "",
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ownerDetails, setOwnerDetails] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await axios.post(`http://localhost:3000/api/properties/view/${propertyId}`, {}, { withCredentials: true });
        setProperty(response.data.data);

        // Fetch owner details
        if (response.data.data.owner) {
          const ownerResponse = await axios.post(`http://localhost:3000/api/auth/user/${response.data.data.owner}`, {}, { withCredentials: true });
          setOwnerDetails(ownerResponse.data.data);
        }
        setLoading(false);
      } catch (error) {
        setError("Error fetching property details");
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  if (error) {
    return <div className="text-center py-4 text-mb font-medium text-red-600">{error}</div>;
  }

  return (
    <UserLayout>
        <Link to="/" className="text-gray-900 px-4 font-semibold hover:underline">
              <User className="h-6 w-6 text-gray-900 mr-2 inline " />
              Back to Home
            </Link>
    { loading ? <DetailsSkeleton/> : <div className="flex min-h-screen p-4">
        
        <div className="bg-white rounded-lg overflow-hidden max-w-6xl w-full flex flex-col lg:flex-row">
          {/* Back Button */}
       
          
        

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
          <div className="w-full lg:w-1/2 p-8 space-y-6">
            <h2 className="text-5xl font-bold mb-4 text-gray-800">{property.title}</h2>
            <div className="text-gray-700 mb-4">
              <div className="flex items-center text-mb mb-2">
                <MapPin className="h-6 w-6 text-gray-500 mr-2" />
                <p className="font-semibold">{property.address}</p>
              </div>
              <div className="flex items-center text-mb mb-1">
                <Tag className="h-5 w-5 text-gray-500 mr-2" />
                <p>Property Type: <span className="font-medium">{property.propertyType}</span></p>
              </div>
              <div className="flex items-center text-mb mb-1">
                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                <p>Area: <span className="font-medium">{property.area} sq ft</span></p>
              </div>
              <div className="flex items-center text-mb mb-1">
                <Tag className="h-5 w-5 text-gray-500 mr-2" />
                <p>Capacity: <span className="font-medium">{property.capacity}</span></p>
              </div>
              <div className="flex items-center text-mb mb-1">
                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                <p>Lease Term: <span className="font-medium">{property.leaseTerm}</span></p>
              </div>
              <div className="flex items-center text-mb mb-2">
                <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                <p>Price: <span className="font-medium">${property.price}</span></p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              {[
                { label: "Has Parking", value: property.hasParking, icon: <CheckCircle className="h-5 w-5 text-green-500" /> },
                { label: "Is Accessible", value: property.isAccessible, icon: <CheckCircle className="h-5 w-5 text-green-500" /> },
                { label: "Is Available", value: property.isAvailable, icon: <CheckCircle className="h-5 w-5 text-green-500" /> },
              ].map(({ label, value, icon }) => (
                <div key={label} className="flex items-center gap-2">
                  {icon}
                  <span className={`text-mb font-medium ${value ? 'text-gray-800' : 'text-gray-400'}`}>{label}</span>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {property.tags.map((tag, index) => (
                  <span key={index} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-mb font-medium">{tag}</span>
                ))}
              </div>
            </div>

            {/* Owner Details */}
            {ownerDetails && (
              <div className="border-t border-gray-200 pt-4 mt-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Owner Details</h3>
                <div className="flex items-center mb-4">
                  <img
                    src={ownerDetails.avatar || 'default-avatar.png'}
                    alt="Owner Avatar"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="flex items-center text-mb mb-1">
                      <User className="h-5 w-5 text-gray-500 mr-2" />
                      <p>Name: <span className="font-medium">{ownerDetails.fullName}</span></p>
                    </div>
                    <div className="flex items-center text-mb">
                      <Mail className="h-5 w-5 text-gray-500 mr-2" />
                      <p>Email: <span className="font-medium">{ownerDetails.email}</span></p>
                    </div>
                    <div className="flex items-center text-mb">
                      <Phone className="h-5 w-5 text-gray-500 mr-2" />
                      <p>Phone: <span className="font-medium">{ownerDetails.phone}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>}
    </UserLayout>
  );
};

export default PropertyDetails;
