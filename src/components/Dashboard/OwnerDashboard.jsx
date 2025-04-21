import React, { useCallback, useEffect, useState } from "react";
import { PropertyCard } from "../PropertyCard/PropertyCard";
import axios from "axios";
import Greeting from "../Greeting/Greeting";
import { CardSkeleton } from "../Skeleton/Skeleton";


export default function UserDashboard() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProperties, setTotalProperties] = useState(0);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("dateNewest");
  const [filterOptions, setFilterOptions] = useState({
    type: "all",
    priceRange: [0, 1000000], 
  });
  const [loading, setLoading] = useState(false);


  const getProperties = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://workbuddy-backend.onrender.com/api/properties/my-properties?page=${page}`,
        {},
        { withCredentials: true }
      );
      const data = response.data.data;
      setProperties(data.properties);
      setTotalPages(data.totalPages);
      setTotalProperties(data.total);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setLoading(false);
    }
  }, [page]);

  const handleSearch = () => {
    let filtered = properties;

    if (searchQuery !== "") {
      filtered = filtered.filter((property) =>
        Object.values(property).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    if (filterOptions.type !== "all") {
      filtered = filtered.filter((property) => property.propertyType === filterOptions.type);
    }

    if (filterOptions.priceRange) {
      filtered = filtered.filter(
        (property) =>
          property.price >= filterOptions.priceRange[0] &&
          property.price <= filterOptions.priceRange[1]
      );
    }

    if (sortOption === "priceAsc") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceDesc") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "dateNewest") {
      filtered = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOption === "dateOldest") {
      filtered = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    setFilteredProperties(filtered);
  };

  useEffect(() => {
    getProperties();
  }, [getProperties, page]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, sortOption, filterOptions, properties]);

  return (
    <div>
           <Greeting/>
       <h1 className="text-3xl my-8 font-semibold text-center">My Properties</h1>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
       
        <div className="w-full md:w-1/3">
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Search here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="w-full md:w-1/3">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full h-10 rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
          >
            <option value="dateNewest">Sort by Date (Newest)</option>
            <option value="dateOldest">Sort by Date (Oldest)</option>
            <option value="priceAsc">Sort by Price (Low to High)</option>
            <option value="priceDesc">Sort by Price (High to Low)</option>
          </select>
        </div>

        <div className="w-full md:w-1/3">
          <select
            value={filterOptions.type}
            onChange={(e) => setFilterOptions((prev) => ({ ...prev, type: e.target.value }))}
            className="w-full h-10 rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
          >
            <option value="all">All Types</option>
            <option value="Meeting Room">Meeting Room</option>
            <option value="Private Office Room">Private Office Room</option>
            <option value="Desk">Desk</option>
          </select>
        </div>
      </div>

      <div className="mx-auto grid w-full items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
      {loading ? (
          // Display 8 skeletons while loading
          Array.from({ length: 8 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : (
          filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard
                key={property._id}
                _id={property._id}
                type={property.propertyType}
                image={property.images && property.images[0]}
                title={property.title}
                address={property.address}
                tags={property.tags}
                price={property.price}
                leaseTerm={property.leaseTerm}
              />
            ))
          ) : (
            <p>No properties available</p>
          )
        )}
      </div>

      <div className="w-full border-t border-gray-300">
        <div className="mt-2 flex items-center justify-between">
          <div>
            <p>
              Showing <strong>{(page - 1) * 10 + 1}</strong> to{" "}
              <strong>{Math.min(page * 10, totalProperties)}</strong> of{" "}
              <strong>{totalProperties}</strong> results
            </p>
          </div>
          <div className="space-x-2">
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:bg-gray-500"
              disabled={page <= 1}
              onClick={() => setPage((prevPage) => prevPage - 1)}
            >
              &larr; Previous
            </button>
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:bg-gray-500"
              disabled={page >= totalPages}
              onClick={() => setPage((prevPage) => prevPage + 1)}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
