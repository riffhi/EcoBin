import React from "react";
import { MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "./placeholder.png",
  iconSize: [38, 38],
});

const position = [19.2183, 72.9781];
// lat: 19.2183, lng: 72.9781

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

      {/* Show saved reports */}
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
    </MapContainer>
  );
}