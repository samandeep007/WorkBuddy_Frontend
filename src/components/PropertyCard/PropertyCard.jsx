import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export function PropertyCard({
  _id,
  title,
  address,
  image,
  tags,
  leaseTerm,
  price,
  type
}) {

  const { user } = useAuth();

  return (
    <div className="rounded-md border transition-transform duration-300 ease-in-out hover:scale-105">
      <img
        src={image}
        alt={title}
        className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
      />
      <div className="p-4">
        <h1 className="inline-flex items-center text-lg font-semibold">
          {title}
        </h1>
        <h2 className="text-md mt-2 font-semibold text-gray-700">
          {type}
        </h2>
        <p className="mt-2 text-sm text-gray-600">{address}</p>
        <div className="mt-2">
          {tags && tags.map((tag, index) => (
            <span
              key={index}
              className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[12px] font-semibold text-gray-900"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="mt-2 flex items-center space-x-2">
          <span className="block text-md font-semibold">Rent : </span>
          <span className="block cursor-pointer rounded-md text-md font-medium">
            ${price}/{leaseTerm === "Daily" ? "day" : leaseTerm.replace("ly", "").toLowerCase()}
          </span>
        </div>
        <Link to={user.isOwner ? `property/edit/${_id}` : `property/${_id}`}>
          <button
            type="button"
            className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80"
          >
            View Property
          </button>
        </Link>
      </div>
    </div>
  );
}
