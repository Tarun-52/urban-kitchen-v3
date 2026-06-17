"use client";

import EmployeeLiveLocationMap from "./EmployeeLiveLocationMap";

export default function EmployeeLiveLocationTab() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Employee Live Location
        </h1>
        <p className="text-sm text-gray-500">
          Track employee real-time location using Google Maps.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <EmployeeLiveLocationMap />
      </div>
    </div>
  );
}