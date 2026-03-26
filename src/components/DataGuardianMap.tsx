import React, { useEffect, useState } from "react";

const DataGuardianMap: React.FC = () => {
  const [MapComponents, setMapComponents] = useState<any>(null);

  useEffect(() => {
    // Dynamically import everything only on the client
    Promise.all([
      import("react-leaflet"),
      import("leaflet"),
      import("leaflet/dist/leaflet.css" as any)
    ]).then(([rl, l]) => {
      setMapComponents({ ...rl, L: l.default });
    });
  }, []);

  if (!MapComponents) {
    return (
      <div className="h-full w-full bg-slate-100 animate-pulse flex items-center justify-center">
        <span className="text-slate-400">Loading Map...</span>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup, L } = MapComponents;

  // Initialize icon only when needed (client-side)
  const certifiedMarkerIcon = L.divIcon({
    className: "custom-marker",
    html: `<div style="
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #059669 0%, #0d9488 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 150px rgba(5, 150, 105, 0.4);
          border: 3px solid white;
      ">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
          </svg>
      </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  return (
    <MapContainer
      center={[24.8, 54.8]}
      zoom={5}
      scrollWheelZoom={false}
      touchZoom={true}
      dragging={true}
      zoomControl={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      {/* InfoTree Computers - Dubai */}
      <Marker position={[25.2048, 55.2708]} icon={certifiedMarkerIcon}>
        <Popup>
          <div style={{ minWidth: "200px", padding: "8px" }}>
            <h3
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                marginBottom: "8px",
                color: "#1e293b",
              }}
            >
              InfoTree Computers
            </h3>
            <p
              style={{
                color: "#64748b",
                fontSize: "12px",
                marginBottom: "4px",
              }}
            >
              CERTIFIED TO:
            </p>
            <p
              style={{
                color: "#059669",
                fontSize: "13px",
                marginBottom: "12px",
              }}
            >
              Data Hygiene Assurance
            </p>
          </div>
        </Popup>
      </Marker>

      {/* Revent Store - UAE */}
      <Marker position={[24.4539, 54.3773]} icon={certifiedMarkerIcon}>
        <Popup>
          <div style={{ minWidth: "200px", padding: "8px" }}>
            <h3
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                marginBottom: "8px",
                color: "#1e293b",
              }}
            >
              Revent Store
            </h3>
            <p
              style={{
                color: "#64748b",
                fontSize: "12px",
                marginBottom: "4px",
              }}
            >
              CERTIFIED TO:
            </p>
            <p
              style={{
                color: "#0d9488",
                fontSize: "13px",
                marginBottom: "12px",
              }}
            >
              Data Hygiene Assurance
            </p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default DataGuardianMap;
