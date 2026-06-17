"use client";

import dynamic from "next/dynamic";

const LeafletEmployeeMap = dynamic(
  () => import("@/components/admin/LeafletEmployeeMap"),
  { ssr: false }
);

type Location = {
  lat: number;
  lng: number;
  address?: string;
} | null;

type Center = {
  lat: number;
  lng: number;
} | undefined;

type LiveMapProps = {
  location?: Location;
  center?: Center;
  height?: string;
  zoom?: number;
  markers?: any[];
  showInfoCards?: boolean;
};

export default function LiveMap({
  location = null,
  center,
  height = "420px",
  markers = [],
}: LiveMapProps) {
  const locations =
    markers.length > 0
      ? markers.map((marker: any, index: number) => ({
          id: marker.id || String(index),
          employeeId: marker.name || marker.employeeId || "EMP001",
          latitude: marker.location?.lat || marker.lat || center?.lat || 28.6139,
          longitude: marker.location?.lng || marker.lng || center?.lng || 77.209,
          accuracy: null,
          createdAt: new Date().toISOString(),
        }))
      : location
      ? [
          {
            id: "current-location",
            employeeId: "Current Location",
            latitude: location.lat,
            longitude: location.lng,
            accuracy: null,
            createdAt: new Date().toISOString(),
          },
        ]
      : center
      ? [
          {
            id: "center-location",
            employeeId: "Center Location",
            latitude: center.lat,
            longitude: center.lng,
            accuracy: null,
            createdAt: new Date().toISOString(),
          },
        ]
      : [];

  return (
    <div style={{ height, width: "100%" }}>
      <LeafletEmployeeMap locations={locations} />
    </div>
  );
}