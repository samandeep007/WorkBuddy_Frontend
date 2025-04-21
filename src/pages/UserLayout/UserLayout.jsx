import React from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';

export default function UserLayout({ children }) {
  return (
    <div className="grid grid-cols-12 min-h-screen">
      {/* Sidebar taking 2 columns */}
      <div className="col-span-2">
        <Sidebar />
      </div>
      {/* Main content taking the remaining 10 columns */}
      <div className="col-span-10 p-6 border-y">
        {children}
      </div>
    </div>
  );
}
