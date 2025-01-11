import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-cluster/lib/assets/MarkerCluster.css';
import 'react-leaflet-cluster/lib/assets/MarkerCluster.Default.css';
import L from 'leaflet';

const icon = L.icon({
  iconUrl: "./placeholder.png",
  iconSize: [38, 38],
});

const position = [19.2183, 72.9781];

export default function mapComp({ selectPosition, reports }) {
  return (
    <MapContainer
      center={position}
      zoom={12}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=a7UJQTqndnJIjJkyCLY1"
      />
      
      {/* Show current selection */}
      {selectPosition && (
        <Marker position={[selectPosition.lat, selectPosition.lon]} icon={icon}>
          <Popup>
            <div>
              <p>Selected Location</p>
              <p>{selectPosition.display_name}</p>
            </div>
          </Popup>
        </Marker>
      )}

      {/* Clustered markers for reports */}
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={(cluster) => {
          const count = cluster.getChildCount();
          return L.divIcon({
            html: `<div class="cluster-marker">${count}</div>`,
            className: 'custom-marker-cluster',
            iconSize: L.point(40, 40)
          });
        }}
      >
        {reports.map((report) => (
          <Marker 
            key={report.id}
            position={[report.position.lat, report.position.lon]} 
            icon={icon}
          >
            <Popup>
              <div className="max-w-xs">
                <img 
                  src={report.image} 
                  alt="Report"
                  className="w-full h-32 object-cover rounded mb-2" 
                />
                <p className="font-bold">Location: {report.locationName}</p>
                <p>{report.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}