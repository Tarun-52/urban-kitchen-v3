"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

type EmployeeLocation = {
  id: string;
  employeeId: string;
  latitude: number;
  longitude: number;
  accuracy?: number | null;
  createdAt: string;
};

const employeeIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function FixMapSize() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }, [map]);

  return null;
}

export default function LeafletEmployeeMap({
  locations,
}: {
  locations: EmployeeLocation[];
}) {
  const center: [number, number] =
    locations.length > 0
      ? [Number(locations[0].latitude), Number(locations[0].longitude)]
      : [28.6139, 77.209];

  return (
    <MapContainer
      center={center}
      zoom={locations.length > 0 ? 15 : 11}
      scrollWheelZoom={true}
      style={{
        height: "520px",
        width: "100%",
        borderRadius: "12px",
      }}
    >
      <FixMapSize />

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={[Number(loc.latitude), Number(loc.longitude)]}
          icon={employeeIcon}
        >
          <Popup>
            <strong>Employee ID:</strong> {loc.employeeId}
            <br />
            <strong>Latitude:</strong> {loc.latitude}
            <br />
            <strong>Longitude:</strong> {loc.longitude}
            <br />
            <strong>Updated:</strong>{" "}
            {new Date(loc.createdAt).toLocaleString("en-IN")}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}