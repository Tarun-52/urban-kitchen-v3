"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const LeafletEmployeeMap = dynamic(
  () => import("./LeafletEmployeeMap"),
  { ssr: false }
);

type EmployeeLocation = {
  id: string;
  employeeId: string;
  latitude: number;
  longitude: number;
  accuracy?: number | null;
  createdAt: string;
};

export default function EmployeeLiveLocationMap() {
  const [locations, setLocations] = useState<EmployeeLocation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLocations = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/employee-location", {
        cache: "no-store",
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setLocations(data);
      } else {
        setLocations([]);
      }
    } catch (error) {
      console.error("Failed to fetch employee locations:", error);
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();

    const interval = setInterval(fetchLocations, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl border border-[#2a2a2a] bg-[#151515] p-4">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-white">
            Employee Live Location
          </h3>
          <p className="text-sm text-gray-500">
            Free OpenStreetMap live employee tracking
          </p>
        </div>

        <button
          onClick={fetchLocations}
          className="w-fit rounded-lg border border-[#59ff00]/30 px-3 py-1 text-sm text-[#59ff00] hover:bg-[#59ff00]/10"
        >
          Refresh Location
        </button>
      </div>

      {loading && (
        <p className="mb-2 text-sm text-gray-500">
          Fetching latest employee location...
        </p>
      )}

      {locations.length === 0 && (
        <div className="mb-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3 text-sm text-yellow-400">
          No employee location found yet. Showing default Delhi location.
        </div>
      )}

      <div className="h-[520px] w-full overflow-hidden rounded-xl border border-[#2a2a2a]">
        <LeafletEmployeeMap locations={locations} />
      </div>
    </div>
  );
}