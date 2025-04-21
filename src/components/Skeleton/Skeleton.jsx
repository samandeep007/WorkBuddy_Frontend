import React from "react";
import ContentLoader from "react-content-loader";

export function CardSkeleton() {
  return (
    <div className="rounded-md border animate-pulse">
      <div className="aspect-[16/9] w-full rounded-md bg-gray-300 md:aspect-auto md:h-[300px] lg:h-[200px]"></div>
      <div className="p-4">
        <div className="h-6 w-3/4 rounded bg-gray-300 mb-4"></div>
        <div className="h-5 w-1/2 rounded bg-gray-300 mb-4"></div>
        <div className="h-4 w-full rounded bg-gray-300 mb-4"></div>
        <div className="flex space-x-2 mb-4">
          <div className="h-4 w-1/4 rounded-full bg-gray-300"></div>
          <div className="h-4 w-1/4 rounded-full bg-gray-300"></div>
          <div className="h-4 w-1/4 rounded-full bg-gray-300"></div>
        </div>
        <div className="h-5 w-1/2 rounded bg-gray-300 mb-4"></div>
        <div className="h-5 w-1/4 rounded bg-gray-300 mb-4"></div>
        <div className="h-10 w-full rounded-sm bg-gray-300"></div>
      </div>
    </div>
  );
}

export function DetailsSkeleton(){
    return (
        <>
       <div className="flex min-h-screen p-4">
      <div className="bg-white rounded-lg overflow-hidden max-w-6xl w-full flex flex-col lg:flex-row">
        {/* Left side: Skeleton for Property Images */}
        <div className="w-full lg:w-1/2 relative p-4">
          <ContentLoader
            speed={2}
            width="100%"
            height={300}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="10" ry="10" width="100%" height="200" />
            <rect x="0" y="220" rx="8" ry="8" width="80" height="80" />
            <rect x="90" y="220" rx="8" ry="8" width="80" height="80" />
            <rect x="180" y="220" rx="8" ry="8" width="80" height="80" />
          </ContentLoader>
        </div>

        {/* Right side: Skeleton for Property Details */}
        <div className="w-full lg:w-1/2 p-8 space-y-6">
          <ContentLoader
            speed={2}
            width="100%"
            height={400}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="60%" height="40" />
            <rect x="0" y="60" rx="4" ry="4" width="40%" height="20" />
            <rect x="0" y="100" rx="4" ry="4" width="50%" height="20" />
            <rect x="0" y="140" rx="4" ry="4" width="30%" height="20" />
            <rect x="0" y="180" rx="4" ry="4" width="70%" height="20" />
            <rect x="0" y="220" rx="4" ry="4" width="40%" height="20" />

            {/* Tags */}
            <rect x="0" y="270" rx="8" ry="8" width="60" height="30" />
            <rect x="70" y="270" rx="8" ry="8" width="60" height="30" />
            <rect x="140" y="270" rx="8" ry="8" width="60" height="30" />
          </ContentLoader>
        </div>
      </div>
    </div>
        </>
    )
}