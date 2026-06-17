"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function EmployeeLocationTracker({
  employeeId,
}: {
  employeeId: string;
}) {
  const [status, setStatus] = useState("Location tracking not started");

  const sendLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported in this browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const payload = {
          employeeId,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };

        await fetch("/api/employee-location", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        setStatus("Location updated successfully");
      },
      () => {
        setStatus("Location permission denied");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  useEffect(() => {
    sendLocation();

    const interval = setInterval(() => {
      sendLocation();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl border p-4 bg-white shadow-sm">
      <h2 className="text-lg font-semibold">Live Location Tracking</h2>
      <p className="text-sm text-gray-600 mt-2">{status}</p>

      <Button onClick={sendLocation} className="mt-4">
        Update Location Now
      </Button>
    </div>
  );
}